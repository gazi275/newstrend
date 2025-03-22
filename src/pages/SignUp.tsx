import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { useNavigate } from "react-router-dom";

import { signupUser } from "../redux/features/newsSlice";
import { AppDispatch } from "../redux/store";

const SignUp = () => {
    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const dispatch = useDispatch<AppDispatch>(); // ✅ Correctly typed dispatch
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            await dispatch(signupUser({ name, email, password })).unwrap(); // ✅ Fixed TypeScript error
            navigate("/login"); // Redirect to login after successful signup
        } catch (err: any) {
            setError(err.message || "Signup failed, please try again.");
        }
    };

    return (
        <section className="min-h-screen flex items-stretch text-white">
            <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0" style={{ backgroundColor: '#161616' }}>
                <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)' }}>
                    <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                </div>
                <div className="w-full py-6 z-20">
                    <form onSubmit={handleSignup} className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                        <div className="pb-2 pt-4">
                            <input type="text" value={name} onChange={(e) => setname(e.target.value)} placeholder="name" className="block w-full p-4 text-lg rounded-sm bg-black text-white" />
                        </div>
                        <div className="pb-2 pt-4">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="block w-full p-4 text-lg rounded-sm bg-black text-white" />
                        </div>
                        <div className="pb-2 pt-4">
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="block w-full p-4 text-lg rounded-sm bg-black text-white" />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="text-right text-gray-400 hover:underline hover:text-gray-100">
                            <a href="#">Forgot your password?</a>
                        </div>
                        <div className="px-4 pb-2 pt-4">
                            <button type="submit" className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)' }}>
                <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                <div className="w-full px-24 z-10">
                    <h1 className="text-5xl font-bold text-left tracking-wide">Keep it special</h1>
                    <p className="text-3xl my-4">Capture your personal memory in a unique way, anywhere.</p>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
