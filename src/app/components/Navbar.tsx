import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { HashLink } from 'react-router-hash-link';

const NAV_LINKS = [
  { label: 'Home',     to: '/'         },
  { label: 'About Us', to: '/about'    },
  { label: 'Programs', to: '/programs' },
  { label: 'Founder Story', to: '/founder' },
 
  { label: 'Testimonials',  to: '/testimonials'  },
];

const MORE_LINKS = [
   { label: 'Articles', to: '/articles' }, 
  { label: 'Gallery',       to: '/gallery'               },
];

/* ── More Dropdown ── */
function MoreMenu({ active, onNav }: { active: string; onNav: () => void }) {
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
    <div
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative"
    >
      <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-[13.5px] tracking-[0.03em] border-0 bg-transparent cursor-pointer transition-colors duration-200 text-black/60 hover:text-black">
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
            {/* Purple-tinted dropdown */}
            <div className="rounded-2xl overflow-hidden bg-[#f5f0ff] border border-violet-200/60 shadow-[0_8px_32px_rgba(139,92,246,0.10)] backdrop-blur-[40px]">
              {MORE_LINKS.map((item, i) => (
                <HashLink
                  smooth
                  key={item.to}
                  to={item.to}
                  scroll={(el) => {
                    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
                  }}
                  onClick={() => { onNav(); setOpen(false); }}
                  className={`
                    flex items-center gap-3 px-5 py-3.5 font-medium text-[13px] transition-all duration-150
                    ${i < MORE_LINKS.length - 1 ? 'border-b border-violet-100/80' : ''}
                    ${active === item.to
                      ? 'text-black bg-violet-50/80'
                      : 'text-black/40 hover:text-black hover:bg-violet-50/50'}
                  `}
                >
                  {active === item.to && (
                    <span className="w-1 h-1 rounded-full bg-violet-500 shrink-0" />
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
function MobileDrawer({
  open, active, onNav,
}: {
  open: boolean;
  active: string;
  onNav: () => void;
}) {
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
          {/* Purple-tinted drawer */}
          <div className="rounded-2xl overflow-hidden bg-[#f5f0ff] border border-violet-200/60 shadow-[0_16px_48px_rgba(139,92,246,0.12)]">
            <nav className="p-2 flex flex-col gap-0.5">
              {[...NAV_LINKS, ...MORE_LINKS].map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.035, ease: [0.22, 1, 0.36, 1] }}
                >
                  <HashLink
                    smooth
                    to={item.to}
                    scroll={(el) => {
                      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
                    }}
                    onClick={onNav}
                    className={`
                      flex items-center justify-between px-4 py-3.5 rounded-xl font-medium text-[13.5px] transition-all duration-150
                      ${active === item.to
                        ? 'text-black bg-violet-100/60 border border-violet-200/60'
                        : 'text-black/35 hover:text-black/75 hover:bg-violet-50/50 border border-transparent'}
                    `}
                  >
                    {item.label}
                    {active === item.to && (
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    )}
                  </HashLink>
                </motion.div>
              ))}
            </nav>

            <div className="h-px mx-4 bg-violet-200/40" />

            <div className="p-3">
              <HashLink smooth to="/articles#contact"
                scroll={(el) => {
                  setTimeout(() => {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 150);
                }}>
                <button className="w-full py-3.5 rounded-xl font-semibold text-[13.5px] tracking-wide text-white border-0 cursor-pointer relative overflow-hidden bg-gradient-to-r from-violet-500 to-purple-700 shadow-[0_4px_24px_rgba(109,40,217,0.4)]">
                  <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  Get Started
                </button>
              </HashLink>
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
  const [scrolled, setScrolled] = useState(false);

  const active = '/' + (location.pathname.split('/')[1] ?? '');

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleNav = () => setMenuOpen(false);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* White + purple-tinted frosted bar */}
      <div className={`
        absolute inset-0 pointer-events-none transition-all duration-300
        backdrop-blur-[24px]
        ${scrolled
          ? 'bg-[linear-gradient(120deg,rgba(245,240,255,0.97),rgba(237,233,254,0.97))] border-b border-violet-200/50'
          : 'bg-[linear-gradient(120deg,rgba(245,240,255,0.90),rgba(237,233,254,0.90))] border-b border-violet-200/30'}
      `} />

      <div className="relative w-full px-6 sm:px-10 lg:px-14 h-[76px] flex items-center justify-between">

        {/* ── logo1 ── */}
        <Link to="/" onClick={handleNav} className="flex items-center gap-3.5 shrink-0 group">
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 420, damping: 20 }}
            className="relative shrink-0"
          >
            <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[0_0_0_1px_rgba(139,92,246,0.35),0_0_16px_rgba(139,92,246,0.2)]" />
            <div className="rounded-2xl overflow-hidden w-12 h-12 bg-white border border-violet-500/40">
              <img src="assets/logo1.png" alt="NTA" className="w-full h-full object-contain block" />
            </div>
          </motion.div>

          <div className="leading-none">
            <p className="text-black/90 text-[15px] sm:text-[17px] font-bold tracking-tight leading-none">
              Namma Trading Academy
            </p>
            <p className="text-black text-[7.5px] sm:text-[8px] tracking-[0.28em] sm:tracking-[0.30em] uppercase mt-[5px]">
              United in learning, United in growth
            </p>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">

          {/* Purple-tinted pill track */}
          <div className="flex items-center gap-0.5 px-2 py-1.5 rounded-2xl bg-violet-100/50 border border-violet-200/50">
            {NAV_LINKS.map((item) => {
              const isActive = active === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={handleNav}
                  className="relative px-4 py-2 rounded-xl group"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-white border border-violet-200/60 shadow-[0_1px_6px_rgba(139,92,246,0.10)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                    />
                  )}
                  <span className={`
                    relative font-semibold text-[13.5px] tracking-[0.02em] transition-colors duration-200
                    ${isActive ? 'text-black' : 'text-black/50 group-hover:text-black'}
                  `}>
                    {item.label}
                  </span>
                </Link>
              );
            })}

            <div className="w-px h-4 bg-violet-300/40 mx-1" />
            <MoreMenu active={active} onNav={handleNav} />
          </div>

          {/* CTA */}
          <HashLink
            smooth
            to="/articles#contact"
            scroll={(el) => {
              setTimeout(() => {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 150);
            }}
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 420, damping: 22 }}
              className="relative overflow-hidden flex items-center px-6 py-2.5 rounded-full font-semibold text-[13px] tracking-[0.04em] text-white border-0 cursor-pointer bg-gradient-to-r from-violet-500 to-purple-700 shadow-[0_2px_16px_rgba(109,40,217,0.45),inset_0_1px_0_rgba(255,255,255,0.2)]"
            >
              <span className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/[0.18] to-transparent rounded-full pointer-events-none" />
              <span className="relative">Get Started</span>
            </motion.button>
          </HashLink>
        </div>

        {/* Mobile burger */}
        <div className="flex items-center lg:hidden gap-3 shrink-0">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => setMenuOpen(v => !v)}
            className="flex items-center justify-center w-10 h-10 rounded-xl text-black/50 hover:text-black transition-colors duration-200 bg-violet-100/50 border border-violet-200/50"
          >
            <AnimatePresence mode="wait">
              {menuOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.12 }}>
                    <X className="w-[18px] h-[18px]" />
                  </motion.div>
                : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.12 }}>
                    <Menu className="w-[18px] h-[18px]" />
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
  );
}