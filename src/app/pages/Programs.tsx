import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  LineChart,
  BarChart3,
  Globe,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  BookOpen,
  Video,
  FileText,
  ArrowLeft
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AnimatedLineChart } from '../components/AnimatedLineChart';

export function Programs() {
  const programs = [
    {
      id: 'equity',
      icon: LineChart,
      title: 'Equity Trading Program',
      subtitle: 'Master Stock Market Analysis',
      description: 'Comprehensive training in equity markets, from price action to institutional order flow. Learn to identify high-probability setups and manage positions like a professional.',
      color: '#00ff88',
      duration: '12 Weeks',
      sessions: '36 Live Sessions',
      students: 'Max 15 Students',
      curriculum: [
        'Market Structure & Institutional Flow',
        'Technical Analysis & Chart Patterns',
        'Volume Profile & Order Flow',
        'Support & Resistance Dynamics',
        'Momentum & Trend Analysis',
        'Position Sizing & Risk Management',
        'Entry & Exit Strategies',
        'Trade Psychology & Discipline'
      ],
      includes: [
        'Live Trading Room Access',
        'Recorded Session Library',
        'Trading Workbook & Templates',
        'One-on-One Mentorship Sessions',
        'Community Access',
        'Lifetime Updates'
      ]
    },
    {
      id: 'options',
      icon: BarChart3,
      title: 'Options Trading Program',
      subtitle: 'Advanced Derivatives Strategies',
      description: 'Deep dive into options trading, Greeks, volatility analysis, and professional strategies used by market makers and institutions.',
      color: '#00d4ff',
      duration: '16 Weeks',
      sessions: '48 Live Sessions',
      students: 'Max 12 Students',
      curriculum: [
        'Options Fundamentals & Greeks',
        'Implied Volatility Analysis',
        'Directional Strategies (Calls & Puts)',
        'Spread Strategies (Verticals, Butterflies)',
        'Income Strategies (Iron Condors, Credit Spreads)',
        'Volatility Trading (Straddles & Strangles)',
        'Risk Management & Position Hedging',
        'Options Chain Analysis'
      ],
      includes: [
        'Live Trading Room Access',
        'Options Scanner Tools',
        'Strategy Backtesting Templates',
        'Weekly Strategy Sessions',
        'Community Access',
        'Lifetime Updates'
      ]
    },
    {
      id: 'forex',
      icon: Globe,
      title: 'Forex & Futures Program',
      subtitle: 'Global Markets Mastery',
      description: 'Navigate the world of currency pairs and futures contracts with institutional-grade analysis and risk management frameworks.',
      color: '#ffc857',
      duration: '14 Weeks',
      sessions: '42 Live Sessions',
      students: 'Max 15 Students',
      curriculum: [
        'Forex Market Structure & Sessions',
        'Currency Pair Dynamics',
        'Multi-Timeframe Analysis',
        'Futures Contracts & Specifications',
        'Macro-Economic Analysis',
        'Leverage & Margin Management',
        'Risk-Reward Optimization',
        'Correlation & Portfolio Management'
      ],
      includes: [
        'Live Trading Room Access',
        'Economic Calendar Tools',
        'Multi-Asset Analysis Framework',
        'Risk Calculator Templates',
        'Community Access',
        'Lifetime Updates'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/20 via-transparent to-[#00d4ff]/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00ff88] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Trading <span className="text-[#00ff88]">Programs</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
              Specialized training programs designed to transform you into a disciplined, systematic trader. 
              Choose the path that aligns with your trading goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0f1421] border border-gray-800 rounded-2xl overflow-hidden hover:border-[#00ff88]/50 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 lg:p-12">
                {/* Left Column - Overview */}
                <div className="lg:col-span-1">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: program.color + '20' }}
                  >
                    <program.icon className="w-8 h-8" style={{ color: program.color }} />
                  </div>

                  <h2 className="text-3xl font-bold mb-2">{program.title}</h2>
                  <p className="text-gray-400 mb-6">{program.subtitle}</p>
                  <p className="text-gray-300 leading-relaxed mb-8">{program.description}</p>

                  {/* Quick Stats */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Clock className="w-5 h-5" style={{ color: program.color }} />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Video className="w-5 h-5" style={{ color: program.color }} />
                      <span>{program.sessions}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Users className="w-5 h-5" style={{ color: program.color }} />
                      <span>{program.students}</span>
                    </div>
                  </div>

                  {/* Mini Chart */}
                  <div className="h-32 bg-[#0a0e1a] rounded-lg overflow-hidden">
                    <AnimatedLineChart color={program.color} height={128} />
                  </div>
                </div>

                {/* Middle Column - Curriculum */}
                <div className="lg:col-span-1">
                  <div className="flex items-center gap-2 mb-6">
                    <BookOpen className="w-5 h-5 text-[#00ff88]" />
                    <h3 className="text-xl font-semibold">Curriculum</h3>
                  </div>

                  <div className="space-y-3">
                    {program.curriculum.map((item, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <CheckCircle 
                          className="w-5 h-5 mt-0.5 flex-shrink-0" 
                          style={{ color: program.color }} 
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - What's Included */}
                <div className="lg:col-span-1">
                  <div className="flex items-center gap-2 mb-6">
                    <FileText className="w-5 h-5 text-[#00d4ff]" />
                    <h3 className="text-xl font-semibold">What's Included</h3>
                  </div>

                  <div className="space-y-3 mb-8">
                    {program.includes.map((item, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <CheckCircle 
                          className="w-5 h-5 mt-0.5 flex-shrink-0" 
                          style={{ color: program.color }} 
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="space-y-3">
                    <button 
                      className="w-full px-6 py-4 text-[#0a0e1a] font-semibold rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg"
                      style={{ backgroundColor: program.color }}
                    >
                      Enroll Now
                    </button>
                    <button className="w-full px-6 py-4 border border-gray-700 text-white font-semibold rounded-lg hover:border-[#00ff88] hover:text-[#00ff88] transition-all duration-300">
                      Book Free Demo
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Section */}
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
              Why Choose <span className="text-[#00ff88]">NTA</span>
            </h2>
            <p className="text-gray-400 text-lg">What sets our programs apart</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Live Market Experience',
                description: 'Learn by doing. Trade live markets with real-time guidance and instant feedback.'
              },
              {
                icon: Users,
                title: 'Small Batch Sizes',
                description: 'Limited students per batch ensure personalized attention and mentorship.'
              },
              {
                icon: BookOpen,
                title: 'Structured Curriculum',
                description: 'Progressive learning path from fundamentals to advanced institutional strategies.'
              },
              {
                icon: Video,
                title: 'Lifetime Access',
                description: 'All recordings, materials, and future updates included with your enrollment.'
              },
              {
                icon: CheckCircle,
                title: 'No Hidden Costs',
                description: 'One-time fee with no recurring charges. Transparent pricing, no surprises.'
              },
              {
                icon: TrendingUp,
                title: 'Post-Program Support',
                description: 'Continued access to community and quarterly strategy sessions after graduation.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0a0e1a] border border-gray-800 rounded-xl p-6 hover:border-[#00ff88]/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#00ff88]/20 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-[#00ff88]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#00ff88]/10 to-[#00d4ff]/10 border border-[#00ff88]/30 rounded-2xl p-12 text-center"
          >
            <h2 className="text-4xl font-bold mb-4">Not Sure Which Program is Right?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Book a free consultation call to discuss your trading goals and get personalized program recommendations
            </p>
            <button className="px-8 py-4 bg-[#00ff88] text-[#0a0e1a] font-semibold rounded-lg hover:bg-[#00d4ff] transition-all duration-300 shadow-lg shadow-[#00ff88]/20">
              Schedule Free Consultation
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
