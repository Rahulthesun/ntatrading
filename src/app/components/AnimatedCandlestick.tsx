import { useEffect, useRef } from 'react';

interface Candle {
  open: number;
  close: number;
  high: number;
  low: number;
  positive: boolean;
}

export function AnimatedCandlestick() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Candle dimensions — smaller
    const CANDLE_W = 7;
    const SPACING = 16; // distance between candle left edges
    const SPEED = 22;   // pixels per second, left → right

    // Ring buffer large enough to always fill the canvas + off-screen buffer
    const POOL = Math.ceil(width / SPACING) + 8;

    // --- Price generation ---
    let basePrice = 120;

    function makeCandle(): Candle {
      basePrice += (Math.random() - 0.5) * 10;
      basePrice = Math.max(70, Math.min(170, basePrice));
      const open  = basePrice;
      const close = open + (Math.random() - 0.5) * 18;
      const hi    = Math.max(open, close) + Math.random() * 8 + 1;
      const lo    = Math.min(open, close) - Math.random() * 8 - 1;
      return { open, close, high: hi, low: lo, positive: close >= open };
    }

    // Circular buffer — pre-filled
    const ring: Candle[] = Array.from({ length: POOL }, makeCandle);

    // `phase`     — how many sub-spacing pixels we've scrolled within the current slot [0, SPACING)
    // `headIndex` — ring index of the candle currently entering from the LEFT edge
    //               (the newest candle; index wraps around)
    let phase = 0;
    let headIndex = 0;
    let lastTime: number | null = null;
    let animationFrame: number;

    // Smooth Y-scale lerp
    let visMin = 70;
    let visMax = 170;

    function scaleY(val: number): number {
      const pad = 32;
      return height - pad - ((val - visMin) / (visMax - visMin)) * (height - pad * 2);
    }

    function animate(ts: number) {
      if (lastTime === null) lastTime = ts;
      const dt = Math.min(ts - lastTime, 50); // cap to avoid big jumps after tab switch
      lastTime = ts;

      // Advance the scroll phase
      phase += (SPEED * dt) / 1000;

      // Each time we cross a full SPACING unit, a new candle has fully entered from the left.
      // Recycle the slot that just scrolled off the right edge with a fresh candle.
      while (phase >= SPACING) {
        phase -= SPACING;
        ring[headIndex] = makeCandle();           // recycle the slot leaving on the right
        headIndex = (headIndex + 1) % POOL;       // advance head (the entering-from-left candle)
      }

      // Update visible price range
      let rawMin = Infinity, rawMax = -Infinity;
      for (const c of ring) {
        if (c.low  < rawMin) rawMin = c.low;
        if (c.high > rawMax) rawMax = c.high;
      }
      visMin += (rawMin - visMin) * 0.02;
      visMax += (rawMax - visMax) * 0.02;

      // --- Render ---
      ctx.clearRect(0, 0, width, height);

      // Subtle grid
      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 1;
      for (let g = 0; g <= 5; g++) {
        const y = Math.round((height / 5) * g) + 0.5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw candles.
      // The newest candle (headIndex - 1) enters from the LEFT.
      // Its left edge is at x = phase  (0 when just spawned, growing toward SPACING).
      // Each successive older candle is SPACING further to the right.
      for (let slot = 0; slot < POOL; slot++) {
        const x = phase + slot * SPACING;         // grows left → right as phase increases

        if (x > width + SPACING) break;           // past right edge — no more candles needed
        if (x + CANDLE_W < 0) continue;           // before left edge — skip

        // headIndex points to the NEXT slot to be recycled, so headIndex - 1 is newest.
        const ringIdx = ((headIndex - 1 - slot) % POOL + POOL) % POOL;
        const c = ring[ringIdx];

        const yHigh  = scaleY(c.high);
        const yLow   = scaleY(c.low);
        const yOpen  = scaleY(c.open);
        const yClose = scaleY(c.close);

        const green    = 'rgba(0, 224, 110, 0.88)';
        const greenGlow = '#00e06e';
        const red      = 'rgba(240, 75, 75, 0.88)';
        const redGlow  = '#f04b4b';

        const color   = c.positive ? green    : red;
        const glowCol = c.positive ? greenGlow : redGlow;
        const cx      = Math.round(x + CANDLE_W / 2) + 0.5;

        // Wick
        ctx.strokeStyle = color;
        ctx.lineWidth   = 1;
        ctx.shadowColor = glowCol;
        ctx.shadowBlur  = 3;
        ctx.beginPath();
        ctx.moveTo(cx, yHigh);
        ctx.lineTo(cx, yLow);
        ctx.stroke();

        // Body
        const bodyTop = Math.min(yOpen, yClose);
        const bodyH   = Math.max(Math.abs(yClose - yOpen), 1.5);
        ctx.fillStyle   = color;
        ctx.shadowColor = glowCol;
        ctx.shadowBlur  = 7;
        ctx.fillRect(Math.round(x), Math.round(bodyTop), CANDLE_W, bodyH);
        ctx.shadowBlur  = 0;
      }

      // Edge vignette — fade candles as they enter/exit
      const fadeW = SPACING * 3;

      const lg = ctx.createLinearGradient(0, 0, fadeW, 0);
      lg.addColorStop(0, 'rgba(0,0,0,1)');
      lg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = lg;
      ctx.fillRect(0, 0, fadeW, height);

      const rg = ctx.createLinearGradient(width - fadeW, 0, width, 0);
      rg.addColorStop(0, 'rgba(0,0,0,0)');
      rg.addColorStop(1, 'rgba(0,0,0,1)');
      ctx.fillStyle = rg;
      ctx.fillRect(width - fadeW, 0, fadeW, height);

      animationFrame = requestAnimationFrame(animate);
    }

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={1200}
      height={400}
      className="w-full h-full opacity-40"
    />
  );
}