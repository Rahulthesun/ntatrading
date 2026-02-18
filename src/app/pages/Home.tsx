import { motion } from 'motion/react';
import { Link } from 'react-router';
import { 
  TrendingUp, 
  Target, 
  Brain, 
  Users, 
  LineChart,
  BarChart3,
  Globe,
  ArrowRight,
  Award,
  Video,
  GraduationCap
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MarketTicker } from '../components/MarketTicker';
import { AnimatedCandlestick } from '../components/AnimatedCandlestick';
import { AnimatedLineChart } from '../components/AnimatedLineChart';
import { PriceGrid } from '../components/PriceGrid';

export function Home() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <PriceGrid />
          <AnimatedCandlestick />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/60 via-[#0a0e1a]/80 to-[#0a0e1a] z-10" />

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-full mb-6">
              <span className="text-[#00ff88] text-sm font-medium">Professional Trading Education</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Excelsior Training
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00d4ff]">
                Institute
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Professional Trading Education Built on Discipline, Risk Management, and Real Markets
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/programs"
                className="px-8 py-4 bg-[#00ff88] text-[#0a0e1a] font-semibold rounded-lg hover:bg-[#00d4ff] transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#00ff88]/20"
              >
                Explore Programs
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="px-8 py-4 border border-gray-700 text-white font-semibold rounded-lg hover:border-[#00ff88] hover:text-[#00ff88] transition-all duration-300">
                Book Free Demo
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0e1a] to-transparent z-10" />
      </section>

      {/* Market Ticker */}
      <MarketTicker />

      {/* Why Excelsior Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why <span className="text-[#00ff88]">Excelsior</span>
            </h2>
            <p className="text-gray-400 text-lg">Built on real market experience, not promises</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: TrendingUp,
                title: 'Real Market Training',
                description: 'Trade live markets with real-time analysis and decision-making frameworks',
                color: '#00ff88'
              },
              {
                icon: Target,
                title: 'Structured Learning Path',
                description: 'Systematic progression from fundamentals to advanced strategies',
                color: '#00d4ff'
              },
              {
                icon: Brain,
                title: 'Risk & Psychology Focus',
                description: 'Master the mental game and risk management that separates professionals',
                color: '#ffc857'
              },
              {
                icon: Users,
                title: 'Mentorship-Driven',
                description: 'Personal guidance from experienced traders who have been in the trenches',
                color: '#00ff88'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-[#0f1421] border border-gray-800 rounded-xl p-6 hover:border-[#00ff88]/50 transition-all duration-300 h-full">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: item.color + '20' }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Overview Section */}
      <section className="py-24 px-6 bg-[#0f1421]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-[#00d4ff]">Programs</span>
            </h2>
            <p className="text-gray-400 text-lg">Specialized tracks for different market instruments</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: LineChart,
                title: 'Equity Trading',
                description: 'Master stock market analysis, price action, and institutional order flow',
                features: ['Technical Analysis', 'Fundamental Research', 'Position Sizing', 'Entry & Exit Strategies'],
                color: '#00ff88'
              },
              {
                icon: BarChart3,
                title: 'Options Trading',
                description: 'Learn advanced options strategies, Greeks, and volatility-based trading',
                features: ['Options Strategies', 'IV Analysis', 'Risk Management', 'Spreads & Hedging'],
                color: '#00d4ff'
              },
              {
                icon: Globe,
                title: 'Forex & Futures',
                description: 'Navigate global markets with currency pairs and futures contracts',
                features: ['Macro Analysis', 'Leverage Management', 'Multi-Timeframe', 'Risk Controls'],
                color: '#ffc857'
              }
            ].map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0a0e1a] border border-gray-800 rounded-xl overflow-hidden hover:border-[#00ff88]/50 transition-all duration-300 group"
              >
                <div className="p-6">
                  <div 
                    className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: program.color + '20' }}
                  >
                    <program.icon className="w-7 h-7" style={{ color: program.color }} />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{program.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{program.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {program.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: program.color }} />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Mini chart */}
                  <div className="h-24 bg-[#0f1421] rounded-lg overflow-hidden">
                    <AnimatedLineChart color={program.color} height={96} />
                  </div>
                </div>

                <div className="px-6 py-4 bg-[#0f1421] border-t border-gray-800">
                  <Link 
                    to="/programs"
                    className="text-[#00ff88] font-medium flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-[#ffc857]">Methodology</span>
            </h2>
            <p className="text-gray-400 text-lg">A systematic approach to trading mastery</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Learn',
                description: 'Comprehensive curriculum covering theory, tools, and market structure',
                color: '#00ff88'
              },
              {
                step: '02',
                title: 'Practice',
                description: 'Simulated trading environment with real market data and scenarios',
                color: '#00d4ff'
              },
              {
                step: '03',
                title: 'Analyze',
                description: 'Review your trades, identify patterns, and refine your edge',
                color: '#ffc857'
              },
              {
                step: '04',
                title: 'Execute',
                description: 'Graduate to live markets with proper risk management and discipline',
                color: '#00ff88'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-[#0f1421] border border-gray-800 rounded-xl p-6 hover:border-[#00ff88]/50 transition-all duration-300">
                  <div 
                    className="text-5xl font-bold mb-4 opacity-20"
                    style={{ color: item.color }}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3" style={{ color: item.color }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </div>
                
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-gray-700 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Credibility Section */}
      <section className="py-24 px-6 bg-[#0f1421]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Built on <span className="text-[#00ff88]">Experience</span>
            </h2>
            <p className="text-gray-400 text-lg">Numbers that matter, results that speak</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                value: '15+',
                label: 'Years of Experience',
                description: 'Trading and teaching across multiple market cycles',
                color: '#00ff88'
              },
              {
                icon: Video,
                value: '500+',
                label: 'Live Market Sessions',
                description: 'Real-time trading analysis and decision-making',
                color: '#00d4ff'
              },
              {
                icon: GraduationCap,
                value: '2,000+',
                label: 'Students Trained',
                description: 'Professionals equipped with institutional-grade skills',
                color: '#ffc857'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0a0e1a] border border-gray-800 rounded-xl p-8 text-center hover:border-[#00ff88]/50 transition-all duration-300"
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: item.color + '20' }}
                >
                  <item.icon className="w-8 h-8" style={{ color: item.color }} />
                </div>
                <div 
                  className="text-5xl font-bold mb-2"
                  style={{ color: item.color }}
                >
                  {item.value}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.label}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#00ff88]/10 to-[#00d4ff]/10 border border-[#00ff88]/30 rounded-2xl p-12 text-center"
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Trading Journey?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Book a free demo session and see how our systematic approach can transform your trading
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-[#00ff88] text-[#0a0e1a] font-semibold rounded-lg hover:bg-[#00d4ff] transition-all duration-300 shadow-lg shadow-[#00ff88]/20">
                Book Free Demo
              </button>
              <Link 
                to="/programs"
                className="px-8 py-4 border border-gray-700 text-white font-semibold rounded-lg hover:border-[#00ff88] hover:text-[#00ff88] transition-all duration-300"
              >
                View All Programs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
