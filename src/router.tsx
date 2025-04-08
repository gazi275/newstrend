import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";

import RootLayout from "./layout/RootLayout";
import SignUp from "./pages/SignUp";
import NewsDetails from "./pages/NewsDetails";



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path:"/news/:newsId", element:<NewsDetails /> },
      { path:"/international-news/:newsId", element:<NewsDetails />} 
    ],
  },
]);

export default router;
