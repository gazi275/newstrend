import { useEffect, useState } from "react";
import { MenuOutlined, CloseOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { logoutUser } from "../redux/features/newsSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector((state: RootState) => state.news.user);


  const handleAuthClick = () => {
    if (user) {
      dispatch(logoutUser());  
    } else {
      navigate("/login"); 
    }
  };
  
 
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-700 p-4 text-white flex justify-between items-center shadow-xl relative">
      {/* Website Name */}
      <div className="text-2xl font-bold tracking-wide">Newslens Bd</div>

      {/* Desktop Links */}
      <ul className="hidden md:flex space-x-6 text-lg">
        <li className="hover:text-gray-400 transition duration-300">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-gray-400 transition duration-300">
          <Link to="/about">About</Link>
        </li>
        <li className="hover:text-gray-400 transition duration-300">
          <Link to="/team">Team</Link>
        </li>
        <li className="hover:text-gray-400 transition duration-300">
          <Link to="/international-news">International</Link>
        </li>
      </ul>

      {/* Search and Login - Always Visible */}
      <div className="flex items-center space-x-4">
        <Input placeholder="Search..." className="hidden md:block w-48 rounded-lg" />
        <Button
          type="primary"
          className="bg-white text-gray-900 hover:bg-gray-800 hover:text-white transition duration-300 flex items-center"
          icon={user ? <LogoutOutlined /> : <LoginOutlined />}
          onClick={handleAuthClick}
        >
          {user ? "Logout" : "Login"}
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-xl" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <CloseOutlined /> : <MenuOutlined />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 bg-opacity-95 text-center flex flex-col space-y-4 py-4 z-50 shadow-md md:hidden">
          <Link to="/" className="hover:text-gray-400 transition duration-300">Home</Link>
          <Link to="/about" className="hover:text-gray-400 transition duration-300">About</Link>
          <Link to="/team" className="hover:text-gray-400 transition duration-300">Team</Link>
          <Link to="/international-news" className="hover:text-gray-400 transition duration-300">International</Link>
          <Input placeholder="Search..." className="w-4/5 mx-auto rounded-lg mt-2" />
          <Button
            type="primary"
            className="bg-white text-gray-900 hover:bg-gray-800 hover:text-white transition duration-300 flex items-center justify-center"
            icon={user ? <LogoutOutlined /> : <LoginOutlined />}
            onClick={handleAuthClick}
          >
            {user ? "Logout" : "Login"}
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
