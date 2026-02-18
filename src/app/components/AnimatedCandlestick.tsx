import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface Candle {
  x: number;
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

    const candles: Candle[] = [];
    const candleWidth = 12;
    const spacing = 20;
    const numCandles = Math.floor(width / spacing);

    // Generate initial candles
    for (let i = 0; i < numCandles; i++) {
      const open = 100 + Math.random() * 50;
      const close = open + (Math.random() - 0.5) * 30;
      const high = Math.max(open, close) + Math.random() * 15;
      const low = Math.min(open, close) - Math.random() * 15;
      
      candles.push({
        x: i * spacing,
        open,
        close,
        high,
        low,
        positive: close > open,
      });
    }

    let animationFrame: number;
    let offset = 0;

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, width, height);

      // Draw grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }

      // Animate candlesticks
      offset += 0.5;
      if (offset >= spacing) {
        offset = 0;
        candles.shift();
        const lastCandle = candles[candles.length - 1];
        const open = lastCandle.close;
        const close = open + (Math.random() - 0.5) * 30;
        const high = Math.max(open, close) + Math.random() * 15;
        const low = Math.min(open, close) - Math.random() * 15;
        
        candles.push({
          x: (numCandles - 1) * spacing,
          open,
          close,
          high,
          low,
          positive: close > open,
        });
      }

      // Draw candles
      candles.forEach((candle, idx) => {
        const x = candle.x - offset;
        const scaleY = (val: number) => height - (val * height / 200);

        // Draw wick
        ctx.strokeStyle = candle.positive ? 'rgba(0, 255, 136, 0.6)' : 'rgba(239, 68, 68, 0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + candleWidth / 2, scaleY(candle.high));
        ctx.lineTo(x + candleWidth / 2, scaleY(candle.low));
        ctx.stroke();

        // Draw body
        const bodyTop = scaleY(Math.max(candle.open, candle.close));
        const bodyHeight = Math.abs(scaleY(candle.close) - scaleY(candle.open));
        
        if (candle.positive) {
          ctx.fillStyle = 'rgba(0, 255, 136, 0.8)';
          ctx.shadowColor = '#00ff88';
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
          ctx.shadowColor = '#ef4444';
          ctx.shadowBlur = 10;
        }
        
        ctx.fillRect(x, bodyTop, candleWidth, bodyHeight || 2);
        ctx.shadowBlur = 0;
      });

      animationFrame = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
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
