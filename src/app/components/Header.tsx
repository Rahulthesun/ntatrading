import { Link } from 'react-router';
import { motion } from 'motion/react';
import { TrendingUp, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e1a]/80 backdrop-blur-md border-b border-gray-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-[#00ff88] to-[#00d4ff] rounded-md flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-[#0a0e1a]" />
          </div>
          <div>
            <div className="text-white font-semibold tracking-tight">Excelsior</div>
            <div className="text-xs text-gray-400 tracking-wide">TRAINING INSTITUTE</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className="text-gray-300 hover:text-[#00ff88] transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/programs" 
            className="text-gray-300 hover:text-[#00ff88] transition-colors"
          >
            Programs
          </Link>
          <Link 
            to="/about" 
            className="text-gray-300 hover:text-[#00ff88] transition-colors"
          >
            About
          </Link>
          <Link 
            to="/testimonials" 
            className="text-gray-300 hover:text-[#00ff88] transition-colors"
          >
            Testimonials
          </Link>
          <button className="px-5 py-2 bg-[#8100D1] text-[#0a0e1a] font-medium rounded hover:bg-[#00d4ff] transition-colors">
            Book Free Demo
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.nav 
          className="md:hidden bg-[#0f1421] border-t border-gray-800"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-6 py-4 space-y-4">
            <Link 
              to="/" 
              className="block text-gray-300 hover:text-[#00ff88] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/programs" 
              className="block text-gray-300 hover:text-[#00ff88] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Programs
            </Link>
            <Link 
              to="/about" 
              className="block text-gray-300 hover:text-[#00ff88] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <button className="w-full px-5 py-2 bg-[#00ff88] text-[#0a0e1a] font-medium rounded hover:bg-[#00d4ff] transition-colors">
              Book Free Demo
            </button>
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}