const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  getFeedback,
  getHistory
} = require('../controllers/feedbackController');

const router = express.Router();

router.post('/feedback', authMiddleware, getFeedback);
router.get('/history', authMiddleware, getHistory);

module.exports = router;
