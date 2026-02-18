import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0a0e1a] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Excelsior Training Institute (LLP)</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional trading education built on discipline, risk management, and real markets.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-[#00ff88]" />
                <span>contact@excelsiortraining.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-[#00ff88]" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-[#00ff88]" />
                <span>Financial District, New York</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Disclaimer</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Trading involves substantial risk and is not suitable for everyone. Past performance is not indicative of future results.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© 2026 Excelsior Training Institute (LLP). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
