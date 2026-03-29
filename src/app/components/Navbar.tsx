import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { HashLink } from 'react-router-hash-link';

const NAV_LINKS = [
  { label: 'Home',     to: '/#hero'         },
  { label: 'About Us', to: '/about#hero'    },
  { label: 'Programs', to: '/programs#hero' },
  { label: 'Articles', to: '/articles' },
];

const MORE_LINKS = [
  { label: 'Founder Story', to: '/about#founder-story' },
  { label: 'Testimonials',  to: '/about#testimonials'  },
];

/* ── More Dropdown ── */
function MoreMenu({ active, onNav }: { active: string; onNav: (to: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  return (
    <div ref={ref} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} className="relative">
      <button
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium text-[13.5px] tracking-[0.04em] border-0 bg-transparent cursor-pointer transition-all duration-200 text-white/75 hover:text-white"
        style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '0.03em' }}
      >
        More
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-3.5 h-3.5 opacity-60" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-52 z-50"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(8, 10, 26, 0.92)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.05) inset',
                backdropFilter: 'blur(40px) saturate(180%)',
              }}
            >
              {MORE_LINKS.map((item, i) => (
                <HashLink
                  smooth
                  key={item.to}
                  to={item.to}
                  scroll={(el) => { window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' }); }}
                  onClick={() => { onNav(item.to); setOpen(false); }}
                  className={`
                    flex items-center gap-3 px-5 py-3.5 font-medium text-[13px] transition-all duration-150
                    ${i < MORE_LINKS.length - 1 ? 'border-b border-white/[0.06]' : ''}
                    ${active === item.to ? 'text-white bg-violet-500/10' : 'text-white/40 hover:text-white hover:bg-white/[0.05]'}
                  `}
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {active === item.to && (
                    <span className="w-1 h-1 rounded-full bg-violet-400 shrink-0" />
                  )}
                  {item.label}
                </HashLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Mobile Drawer ── */
function MobileDrawer({ open, active, onNav }: { open: boolean; active: string; onNav: (to: string) => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-full left-0 right-0 z-50 mt-2 px-3"
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(6, 8, 22, 0.96)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.8)',
              backdropFilter: 'blur(40px)',
            }}
          >
            <nav className="p-2 flex flex-col gap-0.5">
              {[...NAV_LINKS, ...MORE_LINKS].map((item, i) => (
                <motion.div key={item.to} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.035, ease: [0.22,1,0.36,1] }}>
                  <HashLink
                    smooth
                    to={item.to}
                    scroll={(el) => { window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' }); }}
                    onClick={() => onNav(item.to)}
                    className={`
                      flex items-center justify-between px-4 py-3.5 rounded-xl font-medium text-[13.5px] transition-all duration-150
                      ${active === item.to
                        ? 'text-white bg-white/[0.07] border border-white/[0.1]'
                        : 'text-white/35 hover:text-white/75 hover:bg-white/[0.04] border border-transparent'}
                    `}
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    {item.label}
                    {active === item.to && <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />}
                  </HashLink>
                </motion.div>
              ))}
            </nav>
            <div className="h-px mx-4 bg-white/[0.06]" />
            <div className="p-3">
              <button
                className="w-full py-3.5 rounded-xl font-semibold text-[13.5px] tracking-wide text-white border-0 cursor-pointer relative overflow-hidden"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                  boxShadow: '0 4px 24px rgba(109,40,217,0.5)',
                }}
              >
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                Get Started
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── NAVBAR ── */
export function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(location?.pathname ?? '/');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll);
    return () => { window.removeEventListener('resize', onResize); window.removeEventListener('scroll', onScroll); };
  }, []);

  const handleNav = (to: string) => { setActive(to); setMenuOpen(false); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Bricolage+Grotesque:wght@400;500;600;700;800&display=swap');
      `}</style>

      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── Frosted bar — always visible, gets stronger on scroll ── */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-300"
          style={{
            background: scrolled
              ? 'rgba(4, 5, 18, 0.82)'
              : 'rgba(4, 5, 18, 0.55)',
            backdropFilter: 'blur(32px) saturate(180%)',
            borderBottom: scrolled
              ? '1px solid rgba(255,255,255,0.08)'
              : '1px solid rgba(255,255,255,0.04)',
          }}
        />

        <div className="relative w-full px-6 sm:px-10 lg:px-14 h-[76px] flex items-center justify-between">

          {/* ── LEFT: Logo ── */}
          <Link to="/" onClick={() => handleNav('/')} className="flex items-center gap-3.5 shrink-0 group">
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 420, damping: 20 }}
              className="relative shrink-0"
            >
              {/* Glow halo — always visible */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: '0 0 0 1px rgba(139,92,246,0.45), 0 0 24px rgba(139,92,246,0.35)',
                  borderRadius: 16,
                }}
              />
              {/* Logo container — solid enough bg so image always shows */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  width: 48,
                  height: 48,
                  background: 'rgba(15, 10, 40, 0.95)',
                  border: '1px solid rgba(139,92,246,0.45)',
                }}
              >
                <img
                  src="assets/logo.png"
                  alt="NTA"
                  className="w-full h-full object-cover"
                  style={{ display: 'block' }}
                />
              </div>
            </motion.div>

            <div className="leading-none">
              <p
                className="text-white text-[16px] sm:text-[20px] font-bold tracking-tight leading-none"
              >
                Namma Trading Academy
              </p>
              <p
                className="text-white/60 text-[8px]  sm:text-[8.5px] sm:tracking-[0.32em]  uppercase mt-[5px]"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
               United in learning, United in growth 

              </p>
            </div>
          </Link>

          {/* ── RIGHT: Nav + CTA ── */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* Nav pill track */}
            <div
              className="flex items-center gap-0.5 px-2 py-1.5 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {NAV_LINKS.map((item) => {
                const isActive = active === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => handleNav(item.to)}
                    className="relative px-4 py-2 rounded-xl group"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: 'rgba(255,255,255,0.11)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          boxShadow: '0 2px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.12)',
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span
                      className={`relative font-semibold text-[13.5px] tracking-[0.02em] transition-colors duration-200 ${
                        isActive ? 'text-white' : 'text-white/75 group-hover:text-white'
                      }`}
                      style={{ fontFamily: "'Sora', sans-serif" }}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}

              {/* Divider */}
              <div className="w-px h-4 bg-white/[0.12] mx-1" />

              <MoreMenu active={active} onNav={handleNav} />
            </div>

            {/* CTA */}
            <a href='/articles#contact'>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                className="relative overflow-hidden flex items-center px-6 py-2.5 rounded-full font-semibold text-[13px] tracking-[0.04em] text-white border-0 cursor-pointer"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                  boxShadow: '0 2px 20px rgba(109,40,217,0.55), 0 0 0 1px rgba(139,92,246,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                }}
              >
                <span className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/[0.18] to-transparent rounded-full pointer-events-none" />
                <span className="relative">Get Started</span>
              </motion.button>
            </a>
            
          </div>

          {/* Mobile burger */}
          <div className="flex items-center lg:hidden gap-3 shrink-0">
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setMenuOpen(v => !v)}
              className="flex items-center justify-center w-10 h-10 rounded-xl text-white/60 hover:text-white transition-colors duration-200"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <AnimatePresence mode="wait">
                {menuOpen
                  ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.12 }}>
                      <X className="w-4.5 h-4.5" />
                    </motion.div>
                  : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.12 }}>
                      <Menu className="w-4.5 h-4.5" />
                    </motion.div>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className="relative lg:hidden">
          <MobileDrawer open={menuOpen} active={active} onNav={handleNav} />
        </div>
      </motion.header>
    </>
  );
}