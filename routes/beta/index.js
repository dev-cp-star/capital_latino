const express = require('express');
const router = express.Router();
const betaServices = require('../../services/beta');

router.get('/init', async (req, res) => {
  try {
    const results = await betaServices.initBetaEntity();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

module.exports = router;
