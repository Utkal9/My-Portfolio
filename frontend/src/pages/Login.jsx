import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, ChevronRight } from "lucide-react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post("/auth/login", { email, password });
            localStorage.setItem("token", data.token);
            toast.success("Welcome back, Commander.");
            navigate("/admin/dashboard");
        } catch (err) {
            toast.error(err.response?.data?.message || "Access Denied");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-darkBg p-6">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-morph p-8 rounded-3xl w-full max-w-md border-2 border-neoPrimary shadow-neo"
            >
                <div className="text-center mb-8">
                    <div className="bg-neoPrimary/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-neoPrimary">
                        <Lock className="text-neoPrimary" size={32} />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter">
                        Admin <span className="text-neoPrimary">Access</span>
                    </h2>
                    <p className="text-slate-400 text-sm">
                        Authorized personnel only
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail
                                className="absolute left-4 top-3.5 text-slate-500"
                                size={18}
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:border-neoPrimary outline-none transition-all"
                                placeholder="utkal@dev.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock
                                className="absolute left-4 top-3.5 text-slate-500"
                                size={18}
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:border-neoPrimary outline-none transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-neoPrimary hover:bg-white hover:text-black text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                        Authenticate <ChevronRight size={20} />
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
