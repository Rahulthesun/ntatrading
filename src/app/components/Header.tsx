import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight, BarChart2 } from 'lucide-react';
import { useState, useEffect } from 'react';

/* ── Types ── */
interface Stock { symbol: string; price: string; change: string; up: boolean; }
interface NavLink { label: string; to: string; }

const STOCKS: Stock[] = [
  { symbol: 'RELIANCE',   price: '2,941.55',  change: '+1.24%', up: true  },
  { symbol: 'TCS',        price: '3,812.80',  change: '+0.67%', up: true  },
  { symbol: 'HDFCBANK',   price: '1,623.45',  change: '-0.38%', up: false },
  { symbol: 'INFY',       price: '1,487.20',  change: '+2.11%', up: true  },
  { symbol: 'ICICIBANK',  price: '1,204.75',  change: '+0.93%', up: true  },
  { symbol: 'SBIN',       price: '812.30',    change: '-1.05%', up: false },
  { symbol: 'BAJFINANCE', price: '6,934.10',  change: '+1.78%', up: true  },
  { symbol: 'WIPRO',      price: '462.85',    change: '-0.52%', up: false },
  { symbol: 'TATAMOTORS', price: '978.60',    change: '+3.42%', up: true  },
  { symbol: 'ADANIENT',   price: '2,387.90',  change: '-1.89%', up: false },
  { symbol: 'NIFTY 50',   price: '22,430.50', change: '+0.84%', up: true  },
  { symbol: 'SENSEX',     price: '73,852.40', change: '+0.76%', up: true  },
  { symbol: 'MARUTI',     price: '12,341.00', change: '+1.32%', up: true  },
  { symbol: 'HCLTECH',    price: '1,543.70',  change: '-0.21%', up: false },
  { symbol: 'AXISBANK',   price: '1,087.45',  change: '+0.44%', up: true  },
];

const NAV_LINKS: NavLink[] = [
  { label: 'Home',         to: '/'            },
  { label: 'Programs',     to: '/programs'    },
  { label: 'Why Us',       to: '/why-us'      },
  { label: 'Results',      to: '/results'     },
  { label: 'Testimonials', to: '/testimonials'},
  { label: 'Blog',         to: '/blog'        },
  { label: 'About',        to: '/about'       },
  { label: 'Contact',      to: '/contact'     },
];

/* ─── Market Ticker ─── */
function MarketTicker() {
  const doubled = [...STOCKS, ...STOCKS];
  return (
    <div className="relative w-full overflow-hidden h-8 flex items-center bg-[#060a14] border-b border-white/5">
      {/* fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-[#060a14] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-[#060a14] to-transparent" />

      {/* live badge */}
      <div className="absolute left-3 z-20 flex items-center gap-1.5 bg-[#0a0e1a] px-2 py-0.5 rounded">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-emerald-400 text-[9px] font-bold tracking-[0.15em] uppercase">Live</span>
      </div>

      <div className="flex pl-20">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          {doubled.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-gray-500 text-[11px] font-semibold tracking-wide uppercase">{s.symbol}</span>
              <span className="text-white text-[11px] font-medium font-mono">₹{s.price}</span>
              <span className={`text-[10px] font-mono ${s.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                {s.up ? '▲' : '▼'} {s.change}
              </span>
              <span className="text-white/5">|</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Header ─── */
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [active, setActive]         = useState('/');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -140 }} animate={{ y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <MarketTicker />

      {/* main bar */}
      <div
        className="relative border-b transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(11,11,18,0.97)' : 'rgba(11,11,18,0.92)',
          borderColor: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(18px)',
        }}
      >
        {/* top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #8100D1 30%, #00ff88 70%, transparent)' }} />

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[68px]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #8100D1, #00ff88)', boxShadow: '0 0 20px rgba(129,0,209,0.4)' }}>
                <BarChart2 className="w-5 h-5 text-white" />
              </div>
              <div className="absolute inset-0 w-10 h-10 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #00ff88, #00d4ff)', boxShadow: '0 0 24px rgba(0,255,136,0.5)' }}>
                <BarChart2 className="w-5 h-5 text-[#0B0B12]" />
              </div>
            </div>
            <div>
              <div className="text-white font-bold text-xl leading-none tracking-tight">NTA</div>
              <div className="text-[8.5px] font-semibold tracking-[0.22em] leading-none mt-0.5 uppercase"
                style={{ background: 'linear-gradient(90deg, #8100D1, #00ff88)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Trading Academy
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.to} to={item.to}
                onClick={() => setActive(item.to)}
                className="relative px-3 py-2 group text-[12.5px] font-medium"
              >
                <span className={`transition-colors duration-200 ${active === item.to ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                  {item.label}
                </span>
                {active === item.to && (
                  <motion.span layoutId="activeNavDot"
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400" />
                )}
                <span className="absolute bottom-1 left-3 right-3 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ background: 'linear-gradient(90deg, #8100D1, #00ff88)' }} />
              </Link>
            ))}

            <div className="w-px h-6 bg-white/8 mx-2" />

            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="relative flex items-center gap-2 px-5 py-2.5 rounded-lg overflow-hidden group ml-1 text-[12.5px] font-semibold"
            >
              <span className="absolute inset-0 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #8100D1, #5a00a0)' }} />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #00ff88, #00d4ff)' }} />
              <span className="relative text-white group-hover:text-[#0B0B12] transition-colors duration-300 whitespace-nowrap">
                Book Free Demo
              </span>
              <ChevronRight className="relative w-3.5 h-3.5 text-white group-hover:text-[#0B0B12] transition-colors duration-300" />
            </motion.button>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-white/8 text-gray-300 hover:text-white hover:border-purple-600 transition-all duration-200"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="w-5 h-5" /></motion.div>
                : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="w-5 h-5" /></motion.div>
              }
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden border-t border-white/5 bg-[#0B0B12]/98"
            >
              <div className="px-6 py-5">
                <div className="grid grid-cols-2 gap-1 mb-4">
                  {NAV_LINKS.map((item, i) => (
                    <motion.div key={item.to} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
                      <Link
                        to={item.to}
                        onClick={() => { setIsMenuOpen(false); setActive(item.to); }}
                        className="flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 text-sm font-medium"
                      >
                        {item.label}
                        <ChevronRight className="w-3.5 h-3.5 opacity-30" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <div className="h-px bg-white/5 mb-4" />
                <motion.button
                  initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.44 }}
                  className="w-full py-3 rounded-lg font-semibold text-white text-sm"
                  style={{ background: 'linear-gradient(135deg, #8100D1, #5a00a0)', boxShadow: '0 4px 20px rgba(129,0,209,0.35)' }}
                >
                  Book Free Demo
                </motion.button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}