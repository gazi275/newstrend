import { useState } from "react";
import { MenuOutlined, CloseOutlined, LoginOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-700 p-4 text-white flex justify-between items-center shadow-xl">
      {/* Website Name */}
      <div className="text-2xl font-bold tracking-wide">NewsTrend</div>
      
      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6 text-lg">
        <a href="#" className="hover:text-gray-400 transition duration-300">Home</a>
        <a href="#" className="hover:text-gray-400 transition duration-300">Trending</a>
        <a href="#" className="hover:text-gray-400 transition duration-300">Categories</a>
        <a href="#" className="hover:text-gray-400 transition duration-300">Contact</a>
      </div>

      {/* Search and Login - Desktop Only */}
      <div className="hidden md:flex items-center space-x-4">
        <Input placeholder="Search..." className="w-48 rounded-lg" />
        <Button type="primary" className="bg-white text-gray-900 hover:bg-gray-800 hover:text-white transition duration-300" icon={<LoginOutlined />}>Login</Button>
      </div>

     
      <button className="md:hidden text-xl" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <CloseOutlined /> : <MenuOutlined />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 bg-opacity-95 text-center flex flex-col space-y-4 py-4 z-50 md:hidden shadow-md">
          <a href="#" className="hover:text-gray-400 transition duration-300">Home</a>
          <a href="#" className="hover:text-gray-400 transition duration-300">Trending</a>
          <a href="#" className="hover:text-gray-400 transition duration-300">Categories</a>
          <a href="#" className="hover:text-gray-400 transition duration-300">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;