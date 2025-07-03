import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import toast from 'react-hot-toast';
import { Mail, Lock, User } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await API.post('/auth/register', form);
      toast.success('🎉 Registration successful! You can now log in.');
      navigate('/login', {
        state: { successMessage: '🎉 Registration successful! You can now log in.' },
      });
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
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
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 ${
              loading
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-[#8e2de2] to-[#4a00e0] hover:from-[#9b4ef3] hover:to-[#5a1af5] text-white shadow-md hover:shadow-purple-700/50'
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Creating...
              </>
            ) : (
              '✨ Create Account'
            )}
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
            className="text-white font-semibold underline underline-offset-4 hover:text-gray-200 transition cursor-pointer"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
