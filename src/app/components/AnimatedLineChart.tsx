import { useEffect, useRef } from 'react';

interface AnimatedLineChartProps {
  color?: string;
  height?: number;
}

export function AnimatedLineChart({ color = '#00ff88', height = 120 }: AnimatedLineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const canvasHeight = canvas.height;

    const points: number[] = [];
    const numPoints = 50;
    let offset = 0;

    // Generate initial points
    for (let i = 0; i < numPoints; i++) {
      points.push(canvasHeight / 2 + (Math.random() - 0.5) * canvasHeight * 0.5);
    }

    let animationFrame: number;

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, width, canvasHeight);

      // Update points
      offset += 1;
      if (offset >= width / numPoints) {
        offset = 0;
        points.shift();
        const lastPoint = points[points.length - 1];
        const newPoint = lastPoint + (Math.random() - 0.5) * 40;
        points.push(Math.max(20, Math.min(canvasHeight - 20, newPoint)));
      }

      // Draw line
      const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
      gradient.addColorStop(0, color + '80');
      gradient.addColorStop(1, color + '00');

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.beginPath();

      points.forEach((point, idx) => {
        const x = (idx * width) / numPoints - offset;
        if (idx === 0) {
          ctx.moveTo(x, point);
        } else {
          ctx.lineTo(x, point);
        }
      });

      ctx.stroke();
      ctx.shadowBlur = 0;

      // Fill area under line
      ctx.lineTo(width, canvasHeight);
      ctx.lineTo(0, canvasHeight);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      animationFrame = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [color, height]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={height}
      className="w-full h-full"
    />
  );
}
