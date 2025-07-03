import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import toast from 'react-hot-toast';
import { Mail, Lock, User } from 'lucide-react';

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await API.post('/auth/register', form);
            toast.success('🎉 Registration successful!');
            setTimeout(() => navigate('/login'), 300);
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed';
            setError(message);
            toast.error(message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#6366f1] to-[#9333ea] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl backdrop-blur-2xl">
                <h2 className="text-3xl font-bold text-white text-center mb-8">🚀 Create Your Account</h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label htmlFor="name" className="text-white text-sm font-medium mb-1 block">
                            Full Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-2.5 text-white/50 w-5 h-5" />
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                                required
                            />
                        </div>
                    </div>


                    <div>
                        <label htmlFor="email" className="text-white text-sm font-medium mb-1 block">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 text-white/50 w-5 h-5" />
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                                required
                            />
                        </div>
                    </div>


                    <div>
                        <label htmlFor="password" className="text-white text-sm font-medium mb-1 block">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 text-white/50 w-5 h-5" />
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                                required
                            />
                        </div>
                    </div>


                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-white text-indigo-700 font-bold hover:bg-gray-100 transition-all shadow-md hover:shadow-xl"
                    >
                        Register
                    </button>
                </form>


                {error && (
                    <p className="mt-4 text-sm text-center text-red-100 bg-red-500/20 p-2 rounded-lg">
                        {error}
                    </p>
                )}

                <p className="mt-6 text-center text-white/80 text-sm">
                    Already have an account?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className="text-white font-semibold underline underline-offset-4 hover:text-gray-200 transition"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}
