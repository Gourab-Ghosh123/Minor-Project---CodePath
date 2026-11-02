const express = require('express');
const router = express.Router();
const {
  getProblems,
  getProblemById,
  runTestCode,
  addPeerTip,
} = require('../controllers/problem.controller');
const { optionalProtect } = require('../middleware/optionalAuth.middleware');
const { protect } = require('../middleware/auth.middleware');

router.get('/', optionalProtect, getProblems);
router.get('/:id', optionalProtect, getProblemById);
router.post('/:id/run', optionalProtect, runTestCode);
router.post('/:id/tips', protect, addPeerTip);

module.exports = router;
