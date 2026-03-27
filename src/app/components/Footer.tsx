import { Link } from 'react-router'; // or 'react-router-dom' if using v6
import { Mail, Phone, MapPin, Facebook, Linkedin, X } from 'lucide-react';

export function Footer() {
  return (
   <footer className="relative bg-[#003A5C]/75 backdrop-blur-md border-t border-[#0077B3]/40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Left: Brand */}
          <div className="flex flex-col gap-4">
            <span className="text-2xl font-bold text-white/90 tracking-wide">BOCRA</span>
            <div className="flex gap-3 mt-2">
              <a href="https://web.facebook.com/BTAbw/?_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-blue-300 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://www.linkedin.com/company/bta_3/?originalSubdomain=bw" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-blue-300 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="https://x.com/bocrabw" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-blue-300 transition-colors">
                <X size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg text-white/90 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/80 hover:text-white transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/complaints" className="text-white/80 hover:text-white transition-colors text-sm">
                  Report a Complaint
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg text-white/90 mb-4">Contact Us</h3>
            <ul className="space-y-3 text-white/80 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                Plot 50671, Independence Avenue, Gaborone, Botswana
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="flex-shrink-0" />
                +267 395 7755
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="flex-shrink-0" />
                info@bocra.org.bw
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-6 border-t border-[#0077B3]/40 text-center text-white/70 text-sm">
          &copy; 2026 Botswana Communications Regulatory Authority. All rights reserved.
        </div>
      </div>
    </footer>
  );
}