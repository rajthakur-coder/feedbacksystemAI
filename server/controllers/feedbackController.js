require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Feedback = require('../models/Feedback');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.getFeedback = async (req, res) => {
    try {
        const { user_input } = req.body;

        if (!user_input || typeof user_input !== 'string') {
            return res.status(400).json({ message: 'Invalid input' });
        }

        const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });

        const result = await model.generateContent(user_input);
        const response = await result.response;
        const text = response.text();

        await Feedback.create({
            userId: req.user.id,
            user_input,
            feedback: text,
        });

        res.json({ feedback: text });
    } catch (err) {
        console.error('❌ Gemini Error:', err.message);
        res.status(500).json({ message: 'Gemini error', error: err.message });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const history = await Feedback.find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .limit(20);

        res.json({ history });
    } catch (err) {
        console.error('❌ History Error:', err.message);
        res.status(500).json({ message: 'Failed to fetch history', error: err.message });
    }
};
