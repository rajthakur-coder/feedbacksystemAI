import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 w-full px-6 py-4 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#334155] border-b border-white/10 shadow-xl flex justify-between items-center rounded-b-3xl">
            <div
                onClick={() => navigate('/')}
                className="text-2xl font-extrabold bg-gradient-to-r from-teal-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent cursor-pointer transition-all hover:scale-105 drop-shadow-lg"
            >
                ✨ AI Feedback App
            </div>

            <button
                onClick={handleLogout}
                className="px-5 py-2 font-semibold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
                Logout
            </button>
        </nav>
    );
}
