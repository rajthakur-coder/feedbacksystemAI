import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import toast from 'react-hot-toast';
import { Mail, Lock } from 'lucide-react';

export default function Login({ setToken }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
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
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      toast.success('🎉 Login successful');
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-600 via-purple-600 to-blue-600 flex items-center justify-center px-4">
      <div className="bg-white/10 border border-white/30 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-8">🔐 Login to Continue</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-white text-sm font-medium mb-1 block">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-white/50 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:bg-white/20 transition"
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
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:bg-white/20 transition"
                required
              />
            </div>
          </div>

          {/* ✅ Premium Gradient Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 ${
              loading
                ? 'bg-gray-300 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] hover:from-[#ff87d0] hover:to-[#8f88ff] text-white shadow-md hover:shadow-purple-700/50'
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
                Logging in...
              </>
            ) : (
              '🔓 Login'
            )}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-center text-red-100 bg-red-500/20 p-2 rounded-lg">
            {error}
          </p>
        )}

        <p className="mt-6 text-center text-white/80 text-sm">
          Don&apos;t have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-white font-semibold underline underline-offset-4 hover:text-gray-200 transition cursor-pointer"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
