import { FacebookOutlined, TwitterOutlined, InstagramOutlined, YoutubeOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-blue-400">NewsTrend</h2>
            <p className="mt-2 text-gray-400">Your trusted source for the latest news and trends.</p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-400">
            <a href="#" className="hover:text-white transition">Home</a>
            <a href="#" className="hover:text-white transition">Trending</a>
            <a href="#" className="hover:text-white transition">Categories</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-6 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition text-xl"><FacebookOutlined /></a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition text-xl"><TwitterOutlined /></a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition text-xl"><InstagramOutlined /></a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition text-xl"><YoutubeOutlined /></a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} NewsTrend. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
