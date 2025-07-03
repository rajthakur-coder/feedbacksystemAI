import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 w-full px-6 py-4 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-md flex justify-between items-center rounded-b-2xl">

            <div
                onClick={() => navigate('/')}
                className="text-2xl font-bold text-white bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent cursor-pointer transition-all hover:scale-[1.04]"
            >
                ✨ AI Feedback App
            </div>


            <button
                onClick={handleLogout}
                className="px-5 py-2 font-semibold text-white bg-gradient-to-r from-pink-500 to-red-500 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
            >
                Logout
            </button>
        </nav>
    );
}
