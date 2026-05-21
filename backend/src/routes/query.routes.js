const express = require('express');

const router = express.Router();

const {
  handleQuery,
  getHistory
} = require('../controllers/query.controller');

const {
  uploadCSV
} = require('../controllers/upload.controller');

const upload =
  require('../middleware/upload.middleware');

const authMiddleware =
  require('../middleware/auth.middleware');

// QUERY

router.post(
  '/query',
  authMiddleware,
  handleQuery
);

// HISTORY

router.get(
  '/history',
  authMiddleware,
  getHistory
);

// UPLOAD

router.post(
  '/upload',
  authMiddleware,
  upload.single('file'),
  uploadCSV
);

module.exports = router;