
import { Car, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-qmf-dark-gray text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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
        </div>

        {/* Compliance Information */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="text-xs text-gray-400 leading-relaxed">
            <p className="mb-4">
              <strong>FCA No. 660831</strong> Quick Motor Finance is a trading name of Whitehall Road Car Centre Limited who are registered in England and Wales under company number: 05437660. 263 Whitehall Road, Leeds, West Yorkshire, LS12 6ERL, UNITED KINGDOM Whitehall Road Car Centre Limited is authorised and regulated by the Financial Conduct Authority, under FCA number: 660831. We act as a credit broker not a lender.
            </p>
            <p>
              We work with a number of carefully selected credit providers who may be able to offer you finance for your purchase. (Written Quotation available upon request). Whichever lender we introduce you to, we will typically receive commission from them (either a fixed fee or a fixed percentage of the amount you borrow). The lenders we work with could pay commission at different rates. All finance is subject to status and income. Terms and conditions apply. Applicants must be 18 years or over. We are only able to offer finance products from these providers. Whitehall Road Car Centre Limited are registered with the Information Commissioners Office under registration number: ZA055193.
            </p>
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
