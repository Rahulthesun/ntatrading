import {
  ArrowUpRight,
  Brain,
  BookOpen,
  GraduationCap,
  LineChart,
  MonitorSmartphone,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";

import {HashLink} from "react-router-hash-link";

const REASONS = [
  {
    icon: GraduationCap,
    title: "Beginner-Friendly Learning Approach",
    description:
      "Designed for students from all backgrounds with step-by-step guidance and simplified learning.",
  },
  {
    icon: LineChart,
    title: "Real-Time Market Exposure",
    description:
      "Learn through live market observation and practical chart analysis sessions.",
  },
  {
    icon: TrendingUp,
    title: "Practical & Professional Training",
    description:
      "Focused on real-world trading concepts rather than only theoretical learning.",
  },
  {
    icon: BookOpen,
    title: "Structured Learning Programs",
    description:
      "Well-organized courses for beginners, intermediate learners, and advanced traders.",
  },
  {
    icon: Users,
    title: "Personalized Mentorship Support",
    description:
      "Continuous guidance to help students improve confidence and market understanding.",
  },
  {
    icon: Shield,
    title: "Risk Management Focus",
    description:
      "Special emphasis on capital protection, disciplined trading, and emotional control.",
  },
  {
    icon: Brain,
    title: "Supportive Learning Environment",
    description:
      "A space where students can learn, practice, and grow at their own pace with proper guidance.",
  },
  {
    icon: MonitorSmartphone,
    title: "Modern Market Learning Techniques",
    description:
      "Integrated training using advanced charting tools, analysis methods, and market observation strategies.",
  },
];

export function WhyChooseUs({
  FadeUp,
  Rule,
}: {
  FadeUp: React.ComponentType<{
    children: React.ReactNode;
    delay?: number;
    className?: string;
  }>;
  Rule: React.ComponentType;
}) {
  return (
    <section className="relative z-[5] py-24 sm:py-32 px-5 sm:px-6 overflow-hidden">
      <Rule />

      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none [background:radial-gradient(circle,rgba(139,92,246,0.09)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto pt-20 relative z-10">
        <div className="grid lg:grid-cols-[0.95fr_1.2fr] gap-12 xl:gap-20 items-start">
          {/* LEFT SIDE */}
          <div className="lg:sticky lg:top-28">
            <FadeUp>
              <div className="inline-flex items-center gap-2.5 mb-7">
                <div className="h-px w-8 bg-purple-500/40" />
                <span className="text-[10px] uppercase tracking-[0.24em] text-purple-400/60">
                  Why Choose Us
                </span>
              </div>

              <h2
                className="font-serif leading-[1.02] tracking-[-0.04em] text-purple-50 mb-8"
                style={{ fontSize: "clamp(38px,5vw,40px)" }}
              >
                Why Choose 
                NTA Academy?
              </h2>

              <div className="pl-5 border-l border-purple-500/20">
                <p className="text-[15px] text-purple-100/78 leading-[2] max-w-[480px]">
                  We believe stock market education should be practical,
                  simplified, and confidence-building. Our mission is not just
                  to teach trading concepts — but to help students understand
                  real market behaviour with clarity, discipline, and practical
                  exposure.
                </p>
              </div>

              <div className="mt-10 rounded-[32px] border border-purple-500/[0.12] bg-white/[0.02] backdrop-blur-xl p-7 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />

                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-purple-300/45 mb-2">
                      Our Commitment
                    </p>
                    <h3 className="text-lg text-white leading-snug">
                      Creating disciplined & knowledgeable market participants.
                    </h3>
                  </div>

                <HashLink smooth to="/programs#hero"
                  scroll={(el) => { setTimeout(() => { el.scrollIntoView({ behavior: "smooth", block: "start" }) }, 150) }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-400/15 flex items-center justify-center shrink-0">
                    <ArrowUpRight className="w-5 h-5 text-purple-300 onhover:transform onhover:scale-120" />
                  </div>
                </HashLink>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-5">
            {REASONS.map((item, i) => {
              const Icon = item.icon;

              return (
                <FadeUp key={item.title} delay={i * 0.05}>
                  <div className="group relative overflow-hidden rounded-[34px] border border-purple-500/[0.10] bg-[#0C0420]/50 backdrop-blur-xl transition-all duration-500 hover:border-purple-400/22 hover:bg-[#120628]/70">
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-400/25 to-transparent" />

                    <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-purple-500/[0.05] blur-[90px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative p-7 sm:p-8 flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-6">
                      <div className="w-14 h-14 rounded-[22px] bg-purple-500/[0.08] border border-purple-400/[0.12] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-purple-300" />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div>
                            <span className="text-[10px] tracking-[0.22em] uppercase text-purple-400/45 block mb-2">
                              0{i + 1}
                            </span>

                            <h3 className="text-[19px] text-purple-50 leading-tight mb-3 max-w-[520px]">
                              {item.title}
                            </h3>

                            <p className="text-[14px] text-white/72 leading-[1.9] max-w-[580px]">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
