import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Link } from "react-router";

export default function RiskDisclosure() {
  return (
    <div id="top" className="min-h-screen text-white font-sans bg-gradient-to-br
      from-[#1d4ed8]
      via-[#0f172a]
      to-[#000000]"
    >
      <Navbar />

      {/* CONTENT */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        
        {/* heading */}
        <h1 className="text-3xl sm:text-4xl font-serif text-purple-50 mb-6">
          Risk Disclosure
        </h1>

        {/* intro */}
        <p className="text-white/75 text-[14px] leading-[1.8] mb-6">
          Trading and investing in financial markets involves substantial risk.
          The content provided by Namma Trading Academy is for educational
          purposes only and should not be considered financial advice.
        </p>

        {/* points */}
        <div className="flex flex-col gap-5 text-[14px] text-white/70 leading-[1.8]">
          
          <p>
            • Market conditions can change rapidly, and past performance is not
            indicative of future results. Any strategies discussed are examples
            and may not be suitable for all individuals.
          </p>

          <p>
            • You may incur partial or total loss of your capital. You should
            only trade with money you can afford to lose and understand the
            risks involved.
          </p>

          <p>
            • Namma Trading Academy does not guarantee profits, returns, or
            financial success. All decisions made based on our content are your
            sole responsibility.
          </p>

          <p>
            • Before making any financial decisions, you are advised to consult
            with a qualified financial advisor.
          </p>
        </div>

        {/* divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent my-10" />

        {/* back link */}
        <Link
          to="/"
          className="text-purple-300 text-[13px] hover:text-white transition-colors"
        >
          ← Back to Home
        </Link>

      </section>

      <Footer />
    </div>
  );
}