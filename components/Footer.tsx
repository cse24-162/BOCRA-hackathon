import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="bg-[#0095DA] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">About BOCRA</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              The Botswana Communications Regulatory Authority is responsible for regulating 
              telecommunications, broadcasting, and postal services in Botswana.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/licensing" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Apply for License
                </Link>
              </li>
              <li>
                <Link to="/complaints" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Submit Complaint
                </Link>
              </li>
              <li>
                <Link to="/tracking" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Track Application
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Regulatory Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Plot 50654, Fairgrounds, Gaborone, Botswana</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone size={18} className="flex-shrink-0" />
                <span className="text-gray-300">+267 395 7755</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail size={18} className="flex-shrink-0" />
                <span className="text-gray-300">info@bocra.org.bw</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2026 Botswana Communications Regulatory Authority. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}