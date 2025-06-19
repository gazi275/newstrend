import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";

import RootLayout from "./layout/RootLayout";
import SignUp from "./pages/SignUp";
import NewsDetails from "./pages/NewsDetails";
import InternationalNews from "./pages/InternationalNews";
import About from "./pages/About";
import Team from "./pages/Team";
import Sentiment from "./pages/sentiment";



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      {path:"/about", element:<About/>},
      {path:"/team", element:<Team/>},    
      { path:"/news/:newsId", element:<NewsDetails /> },
      { path:"/international-news", element:<InternationalNews/>} ,
      { path:"/international-news/:newsId", element:<NewsDetails />} ,
      { path: "sentiment", element: <Sentiment /> },
    ],
  },
]);

export default router;
