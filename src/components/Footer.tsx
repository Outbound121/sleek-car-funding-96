
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-qmf-dark-gray text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Car className="h-6 w-6 text-qmf-yellow" />
              <span className="text-xl font-bold">Quick Motor Finance</span>
            </div>
            <p className="text-gray-400 mb-6">
              Providing affordable car finance solutions tailored to your needs. 
              We're here to help you drive away in your dream car.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-qmf-yellow transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-qmf-yellow transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-qmf-yellow transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-qmf-yellow transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Apply For Finance</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Available Vehicles</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Finance Calculator</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-qmf-yellow mr-3 mt-0.5" />
                <span className="text-gray-400">
                  123 Finance Street<br />
                  Birmingham, B1 2CD<br />
                  United Kingdom
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-qmf-yellow mr-3" />
                <a href="tel:08001234567" className="text-gray-400 hover:text-white transition-colors">
                  0800 123 4567
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-qmf-yellow mr-3" />
                <a href="mailto:info@quickmotorfinance.com" className="text-gray-400 hover:text-white transition-colors">
                  info@quickmotorfinance.com
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Opening Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-400">Monday - Friday:</span>
                <span className="text-white">9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Saturday:</span>
                <span className="text-white">10:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Sunday:</span>
                <span className="text-white">Closed</span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-qmf-purple/20 rounded">
              <p className="text-white text-sm">
                Need help outside business hours? Send us a message and we'll get back to you as soon as possible.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; 2023 Quick Motor Finance. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-6 text-center">
            Quick Motor Finance is authorised and regulated by the Financial Conduct Authority. Registered in England and Wales (Company No. 12345678).
          </p>
        </div>
      </div>
    </footer>
  );
};
