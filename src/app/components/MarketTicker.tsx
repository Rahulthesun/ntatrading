import { motion } from 'motion/react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const tickerData = [
  { symbol: 'EURUSD', price: '1.0542', change: '+0.12%', positive: true },
  { symbol: 'GBPUSD', price: '1.2631', change: '-0.08%', positive: false },
  { symbol: 'SPX500', price: '4,982.34', change: '+0.45%', positive: true },
  { symbol: 'USDJPY', price: '149.82', change: '+0.23%', positive: true },
  { symbol: 'NASDAQ', price: '17,845.12', change: '+0.67%', positive: true },
  { symbol: 'BTCUSD', price: '68,234', change: '-1.23%', positive: false },
  { symbol: 'GOLD', price: '2,034.50', change: '+0.34%', positive: true },
  { symbol: 'CRUDE', price: '78.45', change: '-0.56%', positive: false },
];

export function MarketTicker() {
  return (
    <div className="bg-[#0f1421] border-y border-gray-800 overflow-hidden py-3">
      <motion.div
        className="flex gap-8"
        animate={{
          x: [0, -1920],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...tickerData, ...tickerData, ...tickerData, ...tickerData].map((item, index) => (
          <div key={index} className="flex items-center gap-2 min-w-fit">
            <span className="text-gray-400 font-medium">{item.symbol}</span>
            <span className="text-white">{item.price}</span>
            <span className={`flex items-center gap-1 ${item.positive ? 'text-[#00ff88]' : 'text-red-400'}`}>
              {item.positive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {item.change}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
