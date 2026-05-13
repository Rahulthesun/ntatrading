import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import Hero from "../components/Hero";

/* ══════════════════════════════════════════════════════════════
   MEDIA — drop files into /public/assets/gallery/
   Set type: "image" or "video" for each item.
   For videos, optionally set a poster (thumbnail) image.
══════════════════════════════════════════════════════════════ */
type MediaItem = {
  type: "image" | "video";
  src: string;
  alt: string;
  poster?: string; // thumbnail shown in grid for videos
};

const MEDIA: MediaItem[] = [
  { type: "video", src: "/assets/gallery/v1.mp4",   alt: "NTA Live Session", poster: "/assets/gallery/v1-thumb.jpeg" },
  { type: "image", src: "/assets/gallery/1.jpeg",   alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/2.jpeg",   alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/3.jpeg",   alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/4.jpeg",   alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/5.jpeg",   alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/6.jpeg",   alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/7.jpeg",   alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/9.jpeg",   alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/10.jpeg",  alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/11.jpeg",  alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/12.jpeg",  alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/13.jpeg",  alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/14.jpeg",  alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/15.jpeg",  alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/16.jpeg",  alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/17.jpeg",  alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/18.jpeg",  alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/19.jpeg",  alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/20.jpeg",  alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/21.jpeg",  alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/22.jpeg",  alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/23.jpeg",  alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/24.jpeg",  alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/25.jpeg",  alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/26.jpeg",  alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/27.jpeg",  alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/28.jpeg",  alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/29.jpeg",  alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/30.jpeg",  alt: "NTA Training Session" },
  { type: "image", src: "/assets/gallery/31.jpeg",  alt: "NTA Training Session" },
];

/* ══════════════════════════════════════════════════════════════
   LIGHTBOX
══════════════════════════════════════════════════════════════ */
function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: MediaItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 backdrop-blur-md px-4"
      onClick={onClose}
    >
      {/* close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all duration-200 cursor-pointer z-10"
      >
        <X className="w-4 h-4" />
      </button>

      {/* prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 sm:left-8 w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all duration-200 cursor-pointer z-10"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* media */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[90vw] max-h-[90vh] rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
          onClick={(e) => e.stopPropagation()}
        >
          {item.type === "video" ? (
            <video
              src={item.src}
              poster={item.poster}
              controls
              autoPlay
              playsInline
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl"
              style={{ background: "#06010F" }}
            />
          ) : (
            <img
              src={item.src}
              alt={item.alt}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 sm:right-8 w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all duration-200 cursor-pointer z-10"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-[11px] tracking-[0.12em] text-white/30">
        {index + 1} / {items.length}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   GRID ITEM
══════════════════════════════════════════════════════════════ */
function GridItem({
  item,
  index,
  onClick,
}: {
  item: MediaItem;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [errored, setErrored] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl cursor-pointer bg-[#0C0420]/65 border border-purple-500/[0.09]"
      style={{ aspectRatio: "4/5" }}
    >
      {/* shimmer top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/18 to-transparent z-10" />

      {errored ? (
        /* placeholder when file isn't loaded yet */
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#0C0420]/80">
          <div className="w-12 h-12 rounded-2xl border border-purple-500/[0.15] flex items-center justify-center bg-purple-500/[0.07]">
            {item.type === "video" ? (
              <Play className="w-5 h-5 text-purple-400/40" />
            ) : (
              <svg className="w-5 h-5 text-purple-400/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 3h18M3 21h18" />
              </svg>
            )}
          </div>
          <p className="font-sans text-[9px] tracking-[0.14em] uppercase text-purple-400/30">
            {item.src.split("/").pop()}
          </p>
        </div>
      ) : item.type === "video" ? (
        /* video thumbnail */
        <>
          <video
            src={item.src}
            poster={item.poster}
            muted
            playsInline
            preload="metadata"
            onError={() => setErrored(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {/* play badge */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-12 h-12 rounded-full bg-white/15 border border-white/25 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/25">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
          </div>
        </>
      ) : (
        /* image */
        <img
          src={item.src}
          alt={item.alt}
          onError={() => setErrored(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      )}

      {/* hover overlay */}
      <div className="absolute inset-0 bg-[#06010F]/0 group-hover:bg-[#06010F]/25 transition-all duration-300" />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open  = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const prev  = () => setLightboxIndex(i => (i! - 1 + MEDIA.length) % MEDIA.length);
  const next  = () => setLightboxIndex(i => (i! + 1) % MEDIA.length);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
      `}</style>

      <div
        className="relative bg-gradient-to-br from-[#1d4ed8] via-[#0f172a] to-[#000000] text-purple-50 overflow-x-hidden font-sans min-h-screen"
      >
        <Hero
          headline="Our Gallery"
          hasMarketTicker={false}
        />
        <Navbar />

        <section className="relative z-[5] px-5 sm:px-6 py-16 sm:py-20">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/[0.11] to-transparent mb-16" />

          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 mb-10"
            >
              <div className="h-px w-6 bg-purple-500/40" />
              <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-purple-400/60">
                Gallery
              </span>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {MEDIA.map((item, i) => (
                <GridItem key={i} item={item} index={i} onClick={() => open(i)} />
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/[0.11] to-transparent mt-16" />
        </section>

        <Footer />
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={MEDIA}
            index={lightboxIndex}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </>
  );
}
