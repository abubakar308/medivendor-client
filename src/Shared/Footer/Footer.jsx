import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold text-base-100">MediVendor</h2>
            <p className="mt-2 text-sm">
              Your trusted online pharmacy. We provide quality medicines at the best price.
            </p>
          </div>
  
          {/* Quick Navlinks */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Navlinks</h3>
            <ul className="mt-2 space-y-2">
              <li><a href="/about" className="hover:text-blue-400">About Us</a></li>
              <li><a href="/products" className="hover:text-blue-400">Our Products</a></li>
              <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
              <li><a href="/faq" className="hover:text-blue-400">FAQs</a></li>
            </ul>
          </div>
  
          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex gap-4 mt-2">
              <a href="https://facebook.com" className="text-xl hover:text-blue-500"><FaFacebook /></a>
              <a href="https://twitter.com" className="text-xl hover:text-blue-400"><FaTwitter /></a>
              <a href="https://instagram.com" className="text-xl hover:text-pink-500"><FaInstagram /></a>
              <a href="https://Navlinkedin.com" className="text-xl hover:text-blue-600"><FaLinkedin /></a>
            </div>
          </div>
        </div>
  
        {/* Copyright Section */}
        <div className="mt-8 text-center text-sm border-t border-gray-700 pt-4">
          <p>&copy; {new Date().getFullYear()} MediVendor. All rights reserved.</p>
        </div>
      </footer>
    );
};

export default Footer;