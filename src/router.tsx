import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/signUp";
import NewsDetails from "./pages/newsDetails";
import RootLayout from "./layout/RootLayout";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "news/:id", element: <NewsDetails /> },
    ],
  },
]);

export default router;
