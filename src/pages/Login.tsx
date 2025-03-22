import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { loginUser } from "../redux/features/newsSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.news);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await dispatch(loginUser({ email, password })).unwrap();
      message.success("Login successful!");
      navigate("/");
    } catch (error: any) {
      message.error(error.message || "Login failed. Try again.");
    }
  };

  return (
    <section className="min-h-screen flex items-stretch text-white">
      <div
        className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)",
        }}
      >
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
      </div>
      <div className="lg:w-1/2 w-full flex items-center justify-center text-center px-6 bg-black">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="block w-full p-4 text-lg rounded-sm bg-gray-800 border border-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="block w-full p-4 text-lg rounded-sm bg-gray-800 border border-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;