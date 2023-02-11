const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Route not implemented yet');
});

module.exports = router;
