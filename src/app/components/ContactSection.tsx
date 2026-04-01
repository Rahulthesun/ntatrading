import { useState } from "react";
import { Phone, Mail, MapPin, ChevronDown, ArrowRight, CheckCircle2 } from "lucide-react";

const COURSES = [
  "Starter — Market Foundations",
  "Growth — Advanced Strategies",
  "Pro — Full Mentorship",
  "Elite — White-Glove Mentorship",
  "30-Day Star Course",
  "Just exploring",
];

const CONTACT_ITEMS = [
  { icon: Phone, label: "+91 91760 01402" },
  { icon: Mail,  label: "contact@ntatrading.in" },
  { icon: MapPin, label: "Chennai, Tamil Nadu" },
];

export function ContactSection() {
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [course,    setCourse]    = useState("");
  const [dropOpen,  setDropOpen]  = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors,    setErrors]    = useState<Record<string, string>>({});

const validate = () => {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "Required";
    if (!lastName.trim())  e.lastName  = "Required";
    if (!email.trim())     e.email     = "Required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Invalid email";
    if (!course)           e.course    = "Please select a course";
    return e;
  };

  const submit = () => {
  const e = validate();
  if (Object.keys(e).length) {
    setErrors(e);
    return;
  }

  setErrors({});

  // 🔥 Build WhatsApp message
  const message = `
Hello NTA Team! 
I want to join your academy. Here are my details:

Name: ${firstName} ${lastName}
Email: ${email}
Course: ${course}
`;

  // Encode message
  const encodedMessage = encodeURIComponent(message);

  // 👉 Replace with your WhatsApp number
  const phoneNumber = "919176001402";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Redirect to WhatsApp
  window.open(whatsappUrl, "_blank");
};

  const inputBase = `
    w-full bg-purple-500/[0.07] border rounded-xl px-4 py-3 text-sm text-purple-100
    placeholder:text-purple-300/30
    focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/10
    transition-all duration-200
  `;

  const errorBorder = "border-red-500/40";
  const normalBorder = "border-purple-500/20";

  return (
    <section id="contact" className="relative bg-transparent py-5 sm:py-14 px-5 sm:px-8 overflow-hidden">

      {/* Top divider */}
      <div className="w-full h-px mb-16 bg-gradient-to-r from-transparent via-purple-500/[0.12] to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* ── Section label ── */}
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-6 bg-purple-500/50" />
          <span className="text-[10px] tracking-[0.22em] uppercase text-purple-300/70">
            Get in Touch
          </span>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">

          {/* LEFT — heading + contact info */}
          <div>
            <h2 className="font-serif text-[clamp(32px,5vw,52px)] leading-tight text-purple-50 mb-4">
              Let's get you{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500">
                started.
              </span>
            </h2>

            <p className="text-sm font-light leading-relaxed text-purple-200/55 mb-10 max-w-sm">
              Have a question or want to enrol? Fill out the form and we'll get back
              to you within 24 hours.
            </p>

            {/* Contact items */}
            <div className="flex flex-col gap-5">
              {CONTACT_ITEMS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                    <Icon size={15} className="text-purple-400" strokeWidth={1.8} />
                  </div>
                  <span className="text-sm text-purple-200/65">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — form card */}
          <div className="rounded-2xl border border-purple-500/[0.15] bg-gradient-to-br from-purple-950/60 to-[#0c0320]/80 backdrop-blur-sm p-7 sm:p-9 relative overflow-hidden">

            {/* Top shimmer */}
            <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />

            {!submitted ? (
              <>
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-purple-400/70 mb-1">
                  Enquiry Form
                </p>
                <h3 className="font-serif text-xl text-purple-50 mb-6">
                  Send us a message
                </h3>

                <div className="flex flex-col gap-5">

                  {/* Name row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold tracking-[0.08em] uppercase text-purple-300/60">
                        First Name <span className="text-purple-400">*</span>
                      </label>
                      <input
                        placeholder="Arjun"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        className={`${inputBase} ${errors.firstName ? errorBorder : normalBorder}`}
                      />
                      {errors.firstName && (
                        <span className="text-[10px] text-red-400/80">{errors.firstName}</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold tracking-[0.08em] uppercase text-purple-300/60">
                        Last Name <span className="text-purple-400">*</span>
                      </label>
                      <input
                        placeholder="Sharma"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        className={`${inputBase} ${errors.lastName ? errorBorder : normalBorder}`}
                      />
                      {errors.lastName && (
                        <span className="text-[10px] text-red-400/80">{errors.lastName}</span>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold tracking-[0.08em] uppercase text-purple-300/60">
                      Email <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="arjun@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className={`${inputBase} ${errors.email ? errorBorder : normalBorder}`}
                    />
                    {errors.email && (
                      <span className="text-[10px] text-red-400/80">{errors.email}</span>
                    )}
                  </div>

                  {/* Course dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold tracking-[0.08em] uppercase text-purple-300/60">
                      Interested Course <span className="text-purple-400">*</span>
                    </label>

                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setDropOpen(v => !v)}
                        className={`
                          w-full flex items-center justify-between
                          bg-purple-500/[0.07] border rounded-xl px-4 py-3
                          text-sm transition-all duration-200 cursor-pointer
                          focus:outline-none
                          ${dropOpen ? "border-purple-500/50 bg-purple-500/10" : errors.course ? errorBorder : normalBorder}
                          ${course ? "text-purple-100" : "text-purple-300/30"}
                        `}
                      >
                        {course || "Select a course"}
                        <ChevronDown
                          size={15}
                          className={`text-purple-400/50 transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {/* Dropdown list */}
                      {dropOpen && (
                        <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-30 rounded-xl border border-purple-500/20 overflow-hidden backdrop-blur-md bg-[#0e0428]/95 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
                          {/* Shimmer */}
                          <div className="h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent" />
                          {COURSES.map((c, i) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => { setCourse(c); setDropOpen(false); }}
                              className={`
                                w-full text-left px-4 py-3 text-sm transition-colors duration-150 cursor-pointer
                                ${i < COURSES.length - 1 ? "border-b border-white/[0.04]" : ""}
                                ${course === c
                                  ? "text-purple-300 bg-purple-500/10"
                                  : "text-purple-200/45 hover:text-purple-100 hover:bg-white/[0.04]"}
                              `}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {errors.course && (
                      <span className="text-[10px] text-red-400/80">{errors.course}</span>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    onClick={submit}
                    className="
                      w-full flex items-center justify-center gap-2 mt-1
                      py-3.5 rounded-xl border-0 cursor-pointer
                      bg-gradient-to-r from-purple-600 to-purple-500
                      text-white text-sm font-semibold tracking-wide
                      shadow-[0_4px_24px_rgba(147,51,234,0.45)]
                      hover:brightness-110 hover:-translate-y-px hover:shadow-[0_8px_32px_rgba(147,51,234,0.6)]
                      transition-all duration-200
                      relative overflow-hidden
                    "
                  >
                    <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                    Send Message
                    <ArrowRight size={15} />
                  </button>

                  <p className="text-[11px] text-center text-purple-300/35 tracking-wide">
                    We respond within 24 hours
                  </p>
                </div>
              </>
            ) : (
              /* Success state */
              <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                <div className="w-14 h-14 rounded-full bg-purple-500/15 border border-purple-500/25 flex items-center justify-center">
                  <CheckCircle2 size={28} className="text-purple-300" />
                </div>
                <div>
                  <p className="font-serif text-xl text-purple-50 mb-2">Message sent!</p>
                  <p className="text-sm text-purple-200/55 max-w-[260px]">
                    Thanks {firstName}, we'll reach out to{" "}
                    <span className="text-purple-300/80">{email}</span> within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setFirstName(""); setLastName(""); setEmail(""); setCourse(""); }}
                  className="mt-2 text-[11px] tracking-[0.08em] uppercase text-purple-400/50 hover:text-purple-300/70 transition-colors duration-200 cursor-pointer border-0 bg-transparent"
                >
                  Send another
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="w-full h-px mt-16 bg-gradient-to-r from-transparent via-purple-500/[0.12] to-transparent" />
    </section>
  );
}