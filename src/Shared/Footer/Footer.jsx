import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral dark:bg-base-100 py-10">
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-primary">MediVendor</h2>
          <p className="mt-2 text-sm">
            Your trusted online pharmacy. We provide quality medicines at the best price.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-secondary">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="#about" className="hover:text-info">About Us</a></li>
            <li><a href="/shop" className="hover:text-info">Our Products</a></li>
            <li><a href="#contact" className="hover:text-info">Contact</a></li>
            <li><a href="#faq" className="hover:text-info">FAQs</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-accent">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a target="_blank" href="https://web.facebook.com/mdabubakar308" className="text-xl hover:text-primary"><FaFacebook /></a>
            <a target="_blank" href="https://twitter.com" className="text-xl hover:text-info"><FaTwitter /></a>
            <a target="_blank" href="https://instagram.com/md.abubakar308" className="text-xl hover:text-error"><FaInstagram /></a>
            <a target="_blank" href="https://linkedin.com" className="text-xl hover:text-secondary"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 text-center text-sm border-t border-gray-300 dark:border-gray-700 pt-4">
        <p>&copy; {new Date().getFullYear()} <span className="text-primary">MediVendor</span>. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
