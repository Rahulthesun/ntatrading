import { useEffect, useRef } from "react";
import { Phone, MessageCircle, ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";

declare global { interface Window { gsap: any } }

const TICKERS = [
  { sym: "NIFTY 50", val: "24,836", chg: "+1.2%", up: true },
  { sym: "SENSEX",   val: "81,224", chg: "+0.9%", up: true },
  { sym: "BANKNIFTY",val: "52,410", chg: "-0.4%", up: false },
  { sym: "RELIANCE", val: "₹2,940", chg: "+2.1%", up: true },
  { sym: "INFY",     val: "₹1,820", chg: "+1.7%", up: true },
  { sym: "TCS",      val: "₹4,150", chg: "-0.2%", up: false },
];

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const chipsRef   = useRef<HTMLDivElement>(null);
  const btnsRef    = useRef<HTMLDivElement>(null);
  const tickerRef  = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const blobARef   = useRef<HTMLDivElement>(null);
  const blobBRef   = useRef<HTMLDivElement>(null);
  const waRef      = useRef<HTMLAnchorElement>(null);
  const callRef    = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const load = () => {
      if (window.gsap) { init(window.gsap); return; }
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
      s.onload = () => init(window.gsap);
      document.head.appendChild(s);
    };

    const init = (g: any) => {
      /* blobs */
      g.to(blobARef.current, { x:50, y:35,  repeat:-1, yoyo:true, duration:13, ease:"sine.inOut" });
      g.to(blobBRef.current, { x:-40, y:-28, repeat:-1, yoyo:true, duration:11, ease:"sine.inOut" });

      /* entrance */
      const tl = g.timeline({ defaults:{ ease:"power3.out" } });
      tl.from(lineRef.current,   { scaleX:0, duration:1, ease:"expo.out", transformOrigin:"left" }, 0.1)
        .from(headRef.current?.querySelectorAll(".hw") ?? [],
          { y:70, opacity:0, duration:0.7, stagger:0.13 }, 0.3)
        .from(subRef.current,    { y:24, opacity:0, duration:0.55 }, 0.85)
        .from(chipsRef.current?.children ?? [],
          { y:16, opacity:0, duration:0.4, stagger:0.09 }, 1.0)
        .from(btnsRef.current?.children ?? [],
          { y:22, opacity:0, duration:0.45, stagger:0.12 }, 1.2)
        .from(tickerRef.current, { y:20, opacity:0, duration:0.5 }, 1.4);

      /* WA glow pulse */
      g.to(waRef.current, {
        boxShadow:"0 0 38px rgba(34,197,94,0.5), 0 8px 26px rgba(34,197,94,0.28)",
        repeat:-1, yoyo:true, duration:1.9, ease:"sine.inOut",
      });

      /* ticker marquee */
      const strip = tickerRef.current;
      if (strip) {
        const totalW = strip.scrollWidth / 2;
        g.to(strip, { x:`-${totalW}px`, duration:28, ease:"none", repeat:-1 });
      }
    };

    load();
  }, []);

  const btnEnter = (ref: React.RefObject<HTMLAnchorElement>) =>
    () => window.gsap?.to(ref.current, { scale:1.05, duration:0.26, ease:"power2.out" });
  const btnLeave = (ref: React.RefObject<HTMLAnchorElement>) =>
    () => window.gsap?.to(ref.current, { scale:1, duration:0.42, ease:"elastic.out(1,0.55)" });

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,800;1,900&display=swap" rel="stylesheet"/>

      <section ref={sectionRef} style={{
        background:"#06000f",
        padding:"100px 24px 0",
        fontFamily:"'Plus Jakarta Sans', sans-serif",
        position:"relative", overflow:"hidden",
      }}>

        {/* ── blobs ── */}
        <div ref={blobARef} style={{
          position:"absolute", width:700, height:700, top:-260, left:-240,
          background:"radial-gradient(ellipse,#36005e 0%,#180028 44%,transparent 70%)",
          borderRadius:"60% 40% 55% 45%/50% 62% 38% 54%",
          filter:"blur(6px)", opacity:0.7, pointerEvents:"none",
        }}/>
        <div ref={blobBRef} style={{
          position:"absolute", width:580, height:580, bottom:60, right:-200,
          background:"radial-gradient(ellipse,#420078 0%,#1e0038 46%,transparent 72%)",
          borderRadius:"42% 58% 48% 52%",
          filter:"blur(6px)", opacity:0.6, pointerEvents:"none",
        }}/>
        {/* grid */}
        <div style={{
          position:"absolute", inset:0, pointerEvents:"none", opacity:0.019,
          backgroundImage:"linear-gradient(rgba(160,100,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(160,100,255,1) 1px,transparent 1px)",
          backgroundSize:"54px 54px",
        }}/>

        {/* ── MAIN CONTENT ── */}
        <div style={{
          position:"relative", zIndex:10,
          maxWidth:900, margin:"0 auto",
          display:"flex", flexDirection:"column", alignItems:"center",
          textAlign:"center",
        }}>

          {/* accent line */}
          <div ref={lineRef} style={{
            width:48, height:3, borderRadius:99, marginBottom:28,
            background:"linear-gradient(90deg,#9333ea,#c084fc,#e879f9)",
            transformOrigin:"left",
          }}/>

          {/* ── HEADLINE ── */}
          <div ref={headRef} style={{ marginBottom:22 }}>
            <h2 className="hw" style={{
              margin:"0 0 4px",
              fontSize:"clamp(38px,5.5vw,68px)",
              fontWeight:900, letterSpacing:"-2.5px", lineHeight:1.02,
              color:"rgba(230,215,255,0.88)",
            }}>
              Get into the Stock Market
            </h2>
            <h2 className="hw" style={{
              margin:0,
              fontSize:"clamp(38px,5.5vw,68px)",
              fontWeight:900, letterSpacing:"-2.5px", lineHeight:1.02,
              fontStyle:"italic",
              background:"linear-gradient(120deg,#f0abfc 0%,#c084fc 40%,#9333ea 80%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            }}>
              with Confidence.
            </h2>
          </div>

          {/* subtext */}
          <p ref={subRef} style={{
            margin:"0 auto 36px",
            fontSize:16, fontWeight:500,
            color:"rgba(200,170,255,0.4)",
            lineHeight:1.75, maxWidth:520,
          }}>
            You don't need to be a genius. You need a system, a mentor, and the
            guts to start. We'll handle the first two.
          </p>

          {/* ── trust chips ── */}
          <div ref={chipsRef} style={{
            display:"flex", gap:10, marginBottom:44,
            flexWrap:"wrap", justifyContent:"center",
          }}>
            {[
              { icon:TrendingUp, label:"12,000+ Trained Traders",  color:"#c084fc" },
              { icon:Shield,     label:"Full Refund Guarantee",     color:"#86efac" },
              { icon:Zap,        label:"Results in 30 Days",        color:"#fbbf24" },
            ].map((c,i) => {
              const CIcon = c.icon;
              return (
                <div key={i} style={{
                  display:"flex", alignItems:"center", gap:7,
                  padding:"7px 16px", borderRadius:99,
                  background:"rgba(160,100,255,0.07)",
                  border:"1px solid rgba(160,100,255,0.15)",
                }}>
                  <CIcon size={12} color={c.color} strokeWidth={2.2}/>
                  <span style={{ color:"rgba(215,190,255,0.55)", fontSize:12, fontWeight:600 }}>{c.label}</span>
                </div>
              );
            })}
          </div>

          {/* ── CTA BUTTONS ── */}
          <div ref={btnsRef} style={{
            display:"flex", gap:14, flexWrap:"wrap", justifyContent:"center",
            marginBottom:72,
          }}>

            {/* WhatsApp */}
            <a
              ref={waRef}
              href="https://wa.me/919999999999?text=Hi!%20I'd%20like%20to%20know%20more%20about%20your%20trading%20programs."
              target="_blank" rel="noopener noreferrer"
              onMouseEnter={btnEnter(waRef)}
              onMouseLeave={btnLeave(waRef)}
              style={{
                display:"inline-flex", alignItems:"center", gap:10,
                padding:"16px 34px", borderRadius:14,
                fontFamily:"'Plus Jakarta Sans',sans-serif",
                fontSize:13, fontWeight:900, letterSpacing:"0.1em",
                textTransform:"uppercase", textDecoration:"none", cursor:"pointer",
                color:"#fff",
                background:"linear-gradient(135deg,#15803d,#22c55e)",
                boxShadow:"0 8px 28px rgba(34,197,94,0.35)",
              }}
            >
              <MessageCircle size={18} strokeWidth={2.2}/>
              Enquire on WhatsApp
              <ArrowRight size={15} strokeWidth={2.5}/>
            </a>

            {/* Call */}
            <a
              ref={callRef}
              href="tel:+919999999999"
              onMouseEnter={btnEnter(callRef)}
              onMouseLeave={btnLeave(callRef)}
              style={{
                display:"inline-flex", alignItems:"center", gap:10,
                padding:"16px 34px", borderRadius:14,
                fontFamily:"'Plus Jakarta Sans',sans-serif",
                fontSize:13, fontWeight:800, letterSpacing:"0.08em",
                textTransform:"uppercase", textDecoration:"none", cursor:"pointer",
                color:"rgba(215,190,255,0.75)",
                background:"rgba(160,100,255,0.07)",
                border:"1px solid rgba(160,100,255,0.22)",
              }}
            >
              <Phone size={16} strokeWidth={2.2}/>
              Call Us
            </a>
          </div>

          {/* availability line */}
          <p style={{
            position:"relative", zIndex:10,
            margin:"0 0 48px",
            fontSize:11.5, color:"rgba(180,140,255,0.25)",
            fontWeight:500, letterSpacing:"0.04em",
          }}>
            Mon – Sat &nbsp;·&nbsp; 9 AM – 7 PM IST &nbsp;·&nbsp; We respond within minutes
          </p>
        </div>

        {/* ── TICKER BAR ── */}
        <div style={{
          position:"relative", zIndex:10,
          borderTop:"1px solid rgba(160,100,255,0.12)",
          background:"rgba(160,100,255,0.04)",
          overflow:"hidden",
          padding:"14px 0",
        }}>
          {/* left fade */}
          <div style={{
            position:"absolute", left:0, top:0, bottom:0, width:80, zIndex:2,
            background:"linear-gradient(90deg,#06000f,transparent)",
            pointerEvents:"none",
          }}/>
          {/* right fade */}
          <div style={{
            position:"absolute", right:0, top:0, bottom:0, width:80, zIndex:2,
            background:"linear-gradient(-90deg,#06000f,transparent)",
            pointerEvents:"none",
          }}/>

          <div ref={tickerRef} style={{
            display:"flex", gap:0,
            width:"max-content",
          }}>
            {[...TICKERS, ...TICKERS].map((t, i) => (
              <div key={i} style={{
                display:"flex", alignItems:"center", gap:10,
                padding:"0 36px",
                borderRight:"1px solid rgba(160,100,255,0.08)",
              }}>
                <span style={{
                  fontSize:11, fontWeight:700, letterSpacing:"0.08em",
                  color:"rgba(200,170,255,0.35)", textTransform:"uppercase",
                }}>{t.sym}</span>
                <span style={{
                  fontSize:13, fontWeight:800,
                  color:"rgba(230,215,255,0.65)",
                }}>{t.val}</span>
                <span style={{
                  fontSize:11, fontWeight:700,
                  color: t.up ? "#4ade80" : "#f87171",
                  display:"flex", alignItems:"center", gap:2,
                }}>
                  {t.up ? "▲" : "▼"} {t.chg}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}