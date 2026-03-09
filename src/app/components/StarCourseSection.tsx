import { useEffect, useRef, useState } from "react";
import {
  TrendingUp, Shield, Lock, Star,
  ArrowRight, CheckCircle2, Flame,
  Sparkles, BarChart2, PiggyBank, Landmark,
} from "lucide-react";

declare global { interface Window { gsap: any } }

const bullets = [
  { icon: TrendingUp, text: "Stock Market & live trading strategies" },
  { icon: BarChart2,  text: "Mutual Funds, SIPs & index investing" },
  { icon: PiggyBank,  text: "Wealth management & financial planning" },
  { icon: Landmark,   text: "Bonds, ETFs & portfolio diversification" },
];

export default function StarCourseSection() {
  const blobARef    = useRef<HTMLDivElement>(null);
  const blobBRef    = useRef<HTMLDivElement>(null);
  const cardRef     = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLButtonElement>(null);
  const shieldRef   = useRef<HTMLDivElement>(null);
  const orbitRef    = useRef<HTMLDivElement>(null);
  const heroRef     = useRef<HTMLDivElement>(null);
  const bulletRefs  = useRef<(HTMLDivElement | null)[]>([]);

  const [email, setEmail]         = useState("");
  const [name,  setName]          = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focus, setFocus]         = useState<string | null>(null);
  const [gsapReady, setGsapReady] = useState(false);

  useEffect(() => {
    if (window.gsap) { setGsapReady(true); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    s.onload = () => setGsapReady(true);
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    if (!gsapReady) return;
    const g = window.gsap;

    const tl = g.timeline({ defaults: { ease: "power3.out" } });
    tl.from([blobARef.current, blobBRef.current],
      { scale: 0.2, opacity: 0, duration: 2.5, stagger: 0.4, ease: "expo.out" }, 0)
      .from(cardRef.current,
        { y: 55, opacity: 0, scale: 0.94, duration: 0.85, ease: "back.out(1.2)" }, 0.5)
      .from(heroRef.current?.querySelectorAll(".hw") ?? [],
        { y: 60, opacity: 0, duration: 0.65, stagger: 0.12, ease: "power4.out" }, 0.85)
      .from(bulletRefs.current,
        { x: -22, opacity: 0, duration: 0.4, stagger: 0.09 }, 1.15);

    g.to(blobARef.current, { x: 50, y: 35,  repeat: -1, yoyo: true, duration: 12, ease: "sine.inOut" });
    g.to(blobBRef.current, { x:-44, y:-28,  repeat: -1, yoyo: true, duration: 15, ease: "sine.inOut" });
    g.to(orbitRef.current, { rotation: 360, repeat: -1, duration: 9, ease: "none" });
    g.to(shieldRef.current,{ y: -5, repeat: -1, yoyo: true, duration: 2.3, ease: "sine.inOut" });
    g.to(ctaRef.current, {
      boxShadow: "0 0 40px rgba(200,180,255,0.2), 0 8px 32px rgba(100,0,180,0.35)",
      repeat: -1, yoyo: true, duration: 2, ease: "sine.inOut",
    });
  }, [gsapReady]);

  const onCtaEnter = () => window.gsap?.to(ctaRef.current, { scale: 1.03, duration: 0.28, ease: "power2.out" });
  const onCtaLeave = () => window.gsap?.to(ctaRef.current, { scale: 1,    duration: 0.45, ease: "elastic.out(1,0.55)" });

  const handleSubmit = () => {
    if (!email || !name) {
      window.gsap?.to(ctaRef.current, { x: -6, duration: 0.07, repeat: 5, yoyo: true });
      return;
    }
    setSubmitted(true);
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,800;1,900&display=swap" rel="stylesheet" />

      <section style={{
        minHeight: "100vh",
        background: "#06000f",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>

        {/* ambient blobs — muted */}
        <div ref={blobARef} style={{
          position:"absolute", width:680, height:680, top:-240, left:-240, pointerEvents:"none",
          background:"radial-gradient(ellipse,#38005a 0%,#180028 45%,transparent 72%)",
          borderRadius:"60% 40% 55% 45%/50% 62% 38% 54%", filter:"blur(6px)", opacity:0.85,
        }}/>
        <div ref={blobBRef} style={{
          position:"absolute", width:560, height:560, bottom:-190, right:-180, pointerEvents:"none",
          background:"radial-gradient(ellipse,#400068 0%,#1e0038 48%,transparent 74%)",
          borderRadius:"42% 58% 48% 52%/58% 42% 56% 44%", filter:"blur(6px)", opacity:0.8,
        }}/>
        {/* faint grid */}
        <div style={{
          position:"absolute", inset:0, pointerEvents:"none", opacity:0.022,
          backgroundImage:"linear-gradient(rgba(160,80,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(160,80,255,0.8) 1px,transparent 1px)",
          backgroundSize:"54px 54px",
        }}/>

        {/* ── CARD ── */}
        <div
          ref={cardRef}
          style={{
            position:"relative", zIndex:10,
            width:"100%", maxWidth:960,
            margin:"0 24px",
            borderRadius:28,
            overflow:"hidden",
            /* toned-down deep purple gradient */
            background:"linear-gradient(150deg,#1e0042 0%,#2e0058 25%,#240050 55%,#180038 100%)",
            border:"1px solid rgba(160,100,255,0.2)",
            boxShadow:"0 32px 90px rgba(60,0,120,0.5), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.07)",
          }}
        >
          {/* top shimmer line */}
          <div style={{
            position:"absolute", top:0, left:"8%", right:"8%", height:1,
            background:"linear-gradient(90deg,transparent,rgba(200,160,255,0.45),transparent)",
          }}/>
          {/* subtle center radial */}
          <div style={{
            position:"absolute", top:"-20%", left:"50%", transform:"translateX(-50%)",
            width:"55%", height:"65%", pointerEvents:"none",
            background:"radial-gradient(ellipse,rgba(140,60,220,0.1) 0%,transparent 68%)",
          }}/>

          <div style={{ display:"flex", position:"relative", zIndex:1 }}>

            {/* ───── LEFT ───── */}
            <div style={{
              flex:"1.15", padding:"34px 34px 28px",
              borderRight:"1px solid rgba(160,100,255,0.12)",
              display:"flex", flexDirection:"column",
            }}>

              {/* badge */}
              <div style={{
                display:"inline-flex", alignItems:"center", gap:7,
                padding:"5px 13px", borderRadius:99, marginBottom:24,
                background:"rgba(160,100,255,0.12)", border:"1px solid rgba(160,100,255,0.22)",
                alignSelf:"flex-start",
              }}>
                <Star size={10} color="#b980ff" fill="#b980ff"/>
                <span style={{ color:"rgba(200,160,255,0.85)", fontSize:10, fontWeight:700, letterSpacing:"0.17em", textTransform:"uppercase" }}>
                  30-Day Star Course · Limited Slots
                </span>
              </div>

              {/* ── ZERO TO HERO ── */}
              <div ref={heroRef} style={{ marginBottom:22 }}>

                {/* "Zero" — lighter, refined */}
                <div className="hw" style={{
                  fontSize:"clamp(52px,6.8vw,82px)",
                  fontWeight:900,
                  fontStyle:"italic",
                  letterSpacing:"-2.5px",
                  lineHeight:1,
                  color:"rgba(220,190,255,0.55)",          /* muted lavender — feels like a ghost word */
                  display:"block",
                }}>Zero</div>

                {/* arrow divider — thin elegant line */}
                <div className="hw" style={{
                  display:"flex", alignItems:"center", gap:12, margin:"4px 0",
                }}>
                  <div style={{ flex:1, maxWidth:120, height:1, background:"linear-gradient(90deg,rgba(180,120,255,0.5),transparent)" }}/>
                  <span style={{ color:"rgba(180,120,255,0.6)", fontSize:18, fontWeight:300 }}>→</span>
                </div>

                {/* "Hero" — bright, dominant */}
                <div className="hw" style={{
                  fontSize:"clamp(62px,8.5vw,100px)",
                  fontWeight:900,
                  fontStyle:"italic",
                  letterSpacing:"-3px",
                  lineHeight:0.92,
                  background:"linear-gradient(120deg,#d8b4fe 0%,#c084fc 40%,#a855f7 75%,#9333ea 100%)",
                  WebkitBackgroundClip:"text",
                  WebkitTextFillColor:"transparent",
                  display:"block",
                }}>Hero.</div>

                {/* one-line description */}
                <p className="hw" style={{
                  fontSize:13, fontWeight:500,
                  color:"rgba(200,170,255,0.5)",
                  letterSpacing:"0.01em",
                  lineHeight:1.5,
                  margin:"10px 0 0",
                  maxWidth:340,
                }}>
                  From knowing nothing about markets to building real wealth — in 30 days flat.
                </p>
              </div>

              {/* bullets */}
              <div style={{ display:"flex", flexDirection:"column", gap:11, flex:1 }}>
                {bullets.map((b, i) => {
                  const BIcon = b.icon;
                  return (
                    <div key={i} ref={el => { bulletRefs.current[i] = el; }}
                      style={{ display:"flex", alignItems:"center", gap:11 }}>
                      <div style={{
                        width:32, height:32, borderRadius:9, flexShrink:0,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        background:"rgba(160,100,255,0.14)",
                        border:"1px solid rgba(160,100,255,0.2)",
                      }}>
                        <BIcon size={14} color="#b980ff" strokeWidth={2.2}/>
                      </div>
                      <span style={{ color:"rgba(220,200,255,0.65)", fontSize:13, fontWeight:500 }}>
                        {b.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* stats */}
              <div style={{
                display:"flex", gap:0, marginTop:22,
                borderRadius:12, overflow:"hidden",
                border:"1px solid rgba(160,100,255,0.14)",
              }}>
                {[{n:"30",s:"Days"},{n:"94%",s:"Completion"},{n:"12k+",s:"Graduates"}].map((x,i)=>(
                  <div key={i} style={{
                    flex:1, padding:"10px 0", textAlign:"center",
                    background:"rgba(160,100,255,0.06)",
                    borderRight: i < 2 ? "1px solid rgba(160,100,255,0.1)" : "none",
                  }}>
                    <div style={{
                      fontSize:20, fontWeight:900,
                      background:"linear-gradient(135deg,#e9d5ff,#c084fc)",
                      WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                    }}>{x.n}</div>
                    <div style={{ color:"rgba(200,170,255,0.38)", fontSize:9.5, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.1em" }}>{x.s}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ───── RIGHT — signup ───── */}
            <div style={{
              width:288, padding:"28px 24px 24px",
              display:"flex", flexDirection:"column", justifyContent:"space-between",
              position:"relative",
            }}>
              {/* orbit */}
              <div ref={orbitRef} style={{
                position:"absolute", top:18, right:18, width:40, height:40,
                border:"1px dashed rgba(160,100,255,0.28)", borderRadius:"50%", pointerEvents:"none",
              }}>
                <div style={{
                  position:"absolute", top:-3.5, left:"50%", transform:"translateX(-50%)",
                  width:7, height:7, borderRadius:"50%",
                  background:"#a855f7",
                  boxShadow:"0 0 8px rgba(168,85,247,0.7)",
                }}/>
              </div>

              {!submitted ? (
                <>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
                      <span style={{ fontSize:9, color:"rgba(200,160,255,0.4)", textTransform:"uppercase", letterSpacing:"0.18em", fontWeight:700 }}>Enrollment</span>
                      <span style={{ padding:"2px 8px", borderRadius:99, fontSize:9, fontWeight:900, color:"#0e0020", background:"#c8f542" }}>OPEN</span>
                    </div>

                    {/* price blur */}
                    <div style={{ marginBottom:16 }}>
                      <div style={{ color:"rgba(200,160,255,0.3)", fontSize:9, textTransform:"uppercase", letterSpacing:"0.17em", fontWeight:700, marginBottom:6 }}>Investment</div>
                      <div style={{ position:"relative", display:"inline-block" }}>
                        <div style={{
                          fontSize:42, fontWeight:900, letterSpacing:"-2px",
                          background:"linear-gradient(135deg,#d8b4fe,#a855f7)",
                          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                          filter:"blur(12px)", userSelect:"none", lineHeight:1,
                        }}>$XXX</div>
                        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <div style={{
                            display:"flex", alignItems:"center", gap:5,
                            padding:"4px 10px", borderRadius:99,
                            background:"rgba(6,0,15,0.8)", border:"1px solid rgba(160,100,255,0.2)",
                            backdropFilter:"blur(8px)",
                          }}>
                            <Lock size={9} color="rgba(200,160,255,0.55)" strokeWidth={2.5}/>
                            <span style={{ color:"rgba(200,160,255,0.55)", fontSize:9.5, fontWeight:700, whiteSpace:"nowrap" }}>Revealed on booking</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ color:"rgba(200,160,255,0.28)", fontSize:10, marginTop:5 }}>Cohort pricing · seats extremely limited</div>
                    </div>

                    {/* inputs */}
                    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                      {[
                        { key:"name",  ph:"Your full name",  val:name,  fn:setName  },
                        { key:"email", ph:"Your best email", val:email, fn:setEmail },
                      ].map(f => (
                        <input
                          key={f.key}
                          type={f.key==="email" ? "email" : "text"}
                          placeholder={f.ph}
                          value={f.val}
                          onChange={e => f.fn(e.target.value)}
                          onFocus={() => setFocus(f.key)}
                          onBlur={() => setFocus(null)}
                          style={{
                            width:"100%", padding:"10px 12px", borderRadius:10,
                            fontFamily:"'Plus Jakarta Sans',sans-serif",
                            fontSize:12, fontWeight:500,
                            boxSizing:"border-box" as const,
                            color:"rgba(230,210,255,0.9)",
                            background:"rgba(160,100,255,0.08)",
                            border: focus===f.key
                              ? "1px solid rgba(168,85,247,0.55)"
                              : "1px solid rgba(160,100,255,0.14)",
                            outline:"none", transition:"border-color 0.25s",
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop:14 }}>
                    <button
                      ref={ctaRef}
                      onMouseEnter={onCtaEnter}
                      onMouseLeave={onCtaLeave}
                      onClick={handleSubmit}
                      style={{
                        width:"100%", padding:"13px 0", borderRadius:12, border:"none",
                        fontFamily:"'Plus Jakarta Sans',sans-serif",
                        fontWeight:900, fontSize:11.5, letterSpacing:"0.14em", textTransform:"uppercase",
                        color:"#fff", cursor:"pointer",
                        background:"linear-gradient(135deg,#7c3aed,#9333ea,#a855f7)",
                        boxShadow:"0 8px 28px rgba(124,58,237,0.45)",
                        display:"flex", alignItems:"center", justifyContent:"center", gap:7,
                      }}
                    >
                      <Sparkles size={12} strokeWidth={2.5}/>
                      Claim My Spot Now
                      <ArrowRight size={12} strokeWidth={2.5}/>
                    </button>

                    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:4, marginTop:6 }}>
                      <Flame size={10} color="rgba(200,160,255,0.3)" strokeWidth={2}/>
                      <span style={{ color:"rgba(200,160,255,0.28)", fontSize:10 }}>Only a few seats left this cohort</span>
                    </div>

                    {/* guarantee */}
                    <div ref={shieldRef} style={{
                      display:"flex", alignItems:"center", gap:9, marginTop:10,
                      padding:"10px 12px", borderRadius:11,
                      background:"rgba(160,100,255,0.07)", border:"1px solid rgba(160,100,255,0.14)",
                    }}>
                      <Shield size={14} color="#a855f7" strokeWidth={2.2} style={{ flexShrink:0 }}/>
                      <span style={{ color:"rgba(200,170,255,0.45)", fontSize:10, lineHeight:1.4 }}>
                        <strong style={{ color:"rgba(220,200,255,0.75)", fontWeight:800 }}>Full Refund</strong> if not transformed in 30 days.
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{
                  height:"100%", display:"flex", flexDirection:"column",
                  alignItems:"center", justifyContent:"center", textAlign:"center", gap:14,
                }}>
                  <div style={{
                    width:52, height:52, borderRadius:"50%",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    background:"linear-gradient(135deg,rgba(168,85,247,0.4),rgba(124,58,237,0.3))",
                    border:"1px solid rgba(168,85,247,0.35)",
                    boxShadow:"0 0 30px rgba(168,85,247,0.3)",
                  }}>
                    <CheckCircle2 size={24} color="#d8b4fe" strokeWidth={2.5}/>
                  </div>
                  <div>
                    <div style={{ color:"rgba(230,210,255,0.9)", fontSize:17, fontWeight:900, marginBottom:5 }}>You're In! 🎉</div>
                    <div style={{ color:"rgba(200,170,255,0.4)", fontSize:11, lineHeight:1.6 }}>
                      Slot details sent to<br/><span style={{ color:"rgba(200,160,255,0.75)", fontWeight:700 }}>{email}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <style>{`
          * { box-sizing: border-box; }
          button, input { outline: none; }
          input::placeholder { color: rgba(180,140,255,0.3); }
        `}</style>
      </section>
    </>
  );
}