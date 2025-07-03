import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../utils/api';
import Navbar from '../components/Navbar';

export default function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();

    const [input, setInput] = useState('');
    const [feedback, setFeedback] = useState('');
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchHistory = async () => {
        try {
            const res = await API.get('/history');
            setHistory(res.data.history);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async () => {
        if (!input.trim()) return;
        setLoading(true);
        try {
            const res = await API.post('/feedback', { user_input: input });
            const newFeedback = res.data.feedback;
            setFeedback(newFeedback);
            setInput('');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();

        if (location.state?.successMessage) {
            toast.success(location.state.successMessage);
            // Clear the state so it doesn’t show again on reload
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white">
            <Navbar />
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-2xl shadow-2xl p-10">
                    <h1 className="text-4xl font-bold text-white text-center mb-10 leading-tight drop-shadow">
                        ✍️ Refine Your Writing with <br />
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            Instant AI Feedback
                        </span>
                    </h1>

                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Start typing your content here..."
                        className="w-full h-44 p-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition resize-none shadow-inner"
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`mt-6 w-full py-3 rounded-2xl font-bold text-lg transition-all duration-200 ${
                            loading
                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                : 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white shadow-lg hover:shadow-2xl'
                        }`}
                    >
                        {loading ? 'Analyzing...' : '🚀 Get AI Feedback'}
                    </button>

                    {loading ? (
                        <div className="mt-10 flex flex-col items-center justify-center text-white/80">
                            <div className="w-10 h-10 border-4 border-cyan-300 border-t-transparent rounded-full animate-spin"></div>
                            <p className="mt-4 text-lg font-medium tracking-wide">Generating feedback...</p>
                        </div>
                    ) : feedback && (
                        <div className="mt-10 bg-white/10 border border-white/20 p-6 rounded-2xl shadow-lg animate-fade-in">
                            <h3 className="text-2xl font-semibold mb-3 text-cyan-300">🧠 AI Feedback</h3>
                            <p className="whitespace-pre-line text-white/90 leading-relaxed">{feedback}</p>
                        </div>
                    )}

                    {history.length > 0 && (
                        <div className="mt-14">
                            <h3 className="text-2xl font-bold mb-6 text-white">📜 Your Last Submissions</h3>
                            <div className="grid gap-6 md:grid-cols-2">
                                {history.map((item) => (
                                    <div
                                        key={item._id}
                                        className="bg-white/5 border border-white/10 p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-200"
                                    >
                                        <p className="text-sm text-white/60 font-semibold mb-1">📝 Input:</p>
                                        <p className="mb-3 text-white">{item.user_input}</p>
                                        <p className="text-sm text-white/60 font-semibold mb-1">📌 Feedback:</p>
                                        <p className="text-white/90">{item.feedback}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
