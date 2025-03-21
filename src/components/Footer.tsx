
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  ChevronRight 
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-qmf-dark text-white">
      <div className="container mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <a href="/" className="flex items-center">
                <span className="text-qmf-accent font-bold text-2xl">Quick</span>
                <span className="text-white font-medium text-2xl">Motor</span>
                <span className="ml-1 text-qmf-accent font-bold text-2xl">Finance</span>
              </a>
            </div>
            <p className="text-white/70 mb-6">
              We specialize in providing affordable and flexible car finance solutions tailored to your needs and budget.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <PhoneCall className="h-5 w-5 text-qmf-accent mr-3" />
                <a href="tel:0800123456" className="text-white/90 hover:text-white transition-colors">
                  0800 123 456
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-qmf-accent mr-3" />
                <a href="mailto:info@quickmotorfinance.com" className="text-white/90 hover:text-white transition-colors">
                  info@quickmotorfinance.com
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-qmf-accent mr-3 mt-1" />
                <address className="text-white/90 not-italic">
                  123 Finance Street, Motorville, <br />
                  MV1 2QF, United Kingdom
                </address>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Vehicles', 'Finance Options', 'Apply Now', 'FAQs', 'Blog', 'Contact Us'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-white/70 hover:text-qmf-accent transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Finance Options */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Finance Options</h3>
            <ul className="space-y-3">
              {[
                'Personal Contract Purchase',
                'Hire Purchase',
                'Personal Loan',
                'Lease Purchase',
                'Bad Credit Finance',
                'First Time Buyer',
                'Business Leasing'
              ].map((option) => (
                <li key={option}>
                  <a 
                    href="#"
                    className="text-white/70 hover:text-qmf-accent transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    {option}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Stay Updated</h3>
            <p className="text-white/70 mb-4">
              Subscribe to our newsletter for the latest offers, finance tips, and vehicle deals.
            </p>
            <form className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-1 focus:ring-qmf-accent bg-white/10 text-white placeholder:text-white/50"
                />
                <button
                  type="submit"
                  className="bg-qmf-accent hover:bg-qmf-accent/90 text-qmf-dark px-4 py-2 rounded-r-md font-medium transition-colors"
                >
                  Join
                </button>
              </div>
            </form>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Twitter, label: 'Twitter' },
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Linkedin, label: 'LinkedIn' }
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-qmf-accent hover:text-qmf-dark transition-colors"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            &copy; {currentYear} Quick Motor Finance. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center mt-4 md:mt-0">
            {[
              'Terms & Conditions',
              'Privacy Policy',
              'Cookie Policy',
              'Complaints',
              'Sitemap'
            ].map((item, index) => (
              <a
                key={item}
                href="#"
                className="text-white/60 hover:text-white text-sm mx-2 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
