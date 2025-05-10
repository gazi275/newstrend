import { useEffect, useState } from "react";
import {
  MenuOutlined,
  CloseOutlined,
  LoginOutlined,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { logoutUser, setSearchQuery } from "../redux/features/newsSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.news.user);
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    dispatch(setSearchQuery(inputValue.trim()));
    setIsOpen(false); // Close mobile menu
  };

  const handleAuthClick = () => {
    if (user) {
      dispatch(logoutUser());
    } else {
      navigate("/login");
    }
    setIsOpen(false); // Close menu
  };

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-700 p-4 text-white shadow-xl relative z-50">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wide">Newslens Bd</div>

        {/* Desktop Menu: visible from lg onwards */}
        <ul className="hidden lg:flex space-x-6 text-lg">
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

        {/* Search & Auth: visible from lg */}
        <div className="hidden lg:flex items-center space-x-4">
          <Input
            placeholder="Search news"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleSearch}
            style={{ width: 250 }}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
          >
            Search
          </Button>

          <Button
            type="primary"
            className="bg-white text-gray-900 hover:bg-gray-800 hover:text-white transition duration-300 flex items-center"
            icon={user ? <LogoutOutlined /> : <LoginOutlined />}
            onClick={handleAuthClick}
          >
            {user ? "Logout" : "Login"}
          </Button>
        </div>

        {/* Mobile/Tablet Menu Button */}
        <button className="lg:hidden text-xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </div>

      {/* Mobile & Tablet Menu */}
      {isOpen && (
        <div className="lg:hidden mt-4 bg-gray-800 rounded-lg py-4 px-6 flex flex-col space-y-4 text-center shadow-md">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-gray-400">
            About
          </Link>
          <Link to="/team" onClick={() => setIsOpen(false)} className="hover:text-gray-400">
            Team
          </Link>
          <Link to="/international-news" onClick={() => setIsOpen(false)} className="hover:text-gray-400">
            International
          </Link>

          <Input
            placeholder="Search news..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleSearch}
            allowClear
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
          >
            Search
          </Button>

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
