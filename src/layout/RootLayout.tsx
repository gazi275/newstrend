import { Outlet, useLocation } from "react-router-dom";
import Footer from "../componenets/Footer";
import Navbar from "../componenets/Navbar";


const RootLayout = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/signup"]; 

  return (
    <div>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />} 
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
