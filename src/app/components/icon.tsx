import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export function FloatingMoneyIcon() {
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 800], [0, 360]);
  const yOffset = useTransform(scrollY, [0, 500], [0, -40]);
  const smoothRotate = useSpring(rotate, { stiffness: 60, damping: 20 });

  return (
    <motion.div
      className="fixed left-6 top-1/2 z-50 pointer-events-none"
      style={{ y: yOffset, translateY: '-50%' }}
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="relative w-16 h-16">
        {/* Outer orbit ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            border: '1.5px dashed rgba(0,255,136,0.3)',
            rotate: smoothRotate,
          }}
        >
          {/* Orbiting dot */}
          <div
            className="absolute w-2.5 h-2.5 rounded-full"
            style={{
              background: '#00ff88',
              boxShadow: '0 0 8px #00ff88',
              top: '-5px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
        </motion.div>

        {/* Coin SVG */}
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <defs>
            <radialGradient id="cg" cx="38%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#00ff88" />
              <stop offset="60%" stopColor="#00c96a" />
              <stop offset="100%" stopColor="#006e38" />
            </radialGradient>
            <filter id="glw">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {/* Coin shadow */}
          <ellipse cx="32" cy="48" rx="18" ry="5" fill="rgba(0,150,60,.3)" />
          {/* Coin body side */}
          <rect x="14" y="26" width="36" height="14" rx="2" fill="#007a40" />
          {/* Coin face */}
          <ellipse cx="32" cy="26" rx="18" ry="6" fill="url(#cg)" filter="url(#glw)" />
          {/* Shine */}
          <ellipse cx="26" cy="24" rx="5" ry="2" fill="rgba(255,255,255,.22)" transform="rotate(-15,26,24)" />
          {/* Dollar sign */}
          <text x="32" y="29" textAnchor="middle" fontSize="10" fontWeight="900" fill="rgba(0,50,20,.9)" fontFamily="Arial">$</text>
        </svg>
      </div>

      {/* Glow pulse beneath */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,255,136,.25) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}