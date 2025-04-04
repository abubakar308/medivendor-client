import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary py-10">
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-secondary">MediVendor</h2>
          <p className="mt-2 text-sm">
            Your trusted online pharmacy. We provide quality medicines at the best price.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-secondary">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="/aboutus" className="hover:text-info">About Us</a></li>
            <li><a href="/shop" className="hover:text-info">Our Products</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-secondary">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a target="_blank" href="https://web.facebook.com/mdabubakar308" className="text-xl hover:text-info"><FaFacebook /></a>
            <a target="_blank" href="https://x.com/MdAbuba19583062" className="text-xl hover:text-info"><FaTwitter /></a>
            <a target="_blank" href="https://github.com/abubakar308" className="text-xl hover:text-error"><FaGithub /></a>
            <a target="_blank" href="https://www.linkedin.com/in/abubakar308" className="text-xl hover:text-secondary"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 text-center text-sm border-t pt-4">
        <p>&copy; {new Date().getFullYear()} <span className="text-secondary">MediVendor</span> All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
