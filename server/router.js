const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Paypal Mafia was here.')
});

module.exports = router;