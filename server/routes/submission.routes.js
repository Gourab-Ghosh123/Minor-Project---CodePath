const express = require('express');
const router = express.Router();
const { createSubmission, getUserSubmissions } = require('../controllers/submission.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/', protect, createSubmission);
router.get('/', protect, getUserSubmissions);

module.exports = router;
