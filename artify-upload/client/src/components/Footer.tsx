import { Palette } from "lucide-react";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <Palette className="text-accent-500 h-8 w-8 mr-3" />
              <span className="text-2xl font-bold">Artify</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Secure provenance tracking for the art world. Every piece tells a story, and we help preserve it.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#features" className="hover:text-accent-400 transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-accent-400 transition-colors">Pricing</a></li>
              <li><a href="#api" className="hover:text-accent-400 transition-colors">API</a></li>
              <li><a href="#integrations" className="hover:text-accent-400 transition-colors">Integrations</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#help" className="hover:text-accent-400 transition-colors">Help Center</a></li>
              <li><a href="#contact" className="hover:text-accent-400 transition-colors">Contact Us</a></li>
              <li><a href="#documentation" className="hover:text-accent-400 transition-colors">Documentation</a></li>
              <li><a href="#community" className="hover:text-accent-400 transition-colors">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-accent-500 rounded-lg flex items-center justify-center transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-accent-500 rounded-lg flex items-center justify-center transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-accent-500 rounded-lg flex items-center justify-center transition-colors">
                <FaLinkedin />
              </a>
            </div>
            <p className="text-gray-300 text-sm">
              Stay updated with the latest in art technology
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Artify. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#privacy" className="text-gray-400 hover:text-accent-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#terms" className="text-gray-400 hover:text-accent-400 text-sm transition-colors">Terms of Service</a>
            <a href="#cookies" className="text-gray-400 hover:text-accent-400 text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
