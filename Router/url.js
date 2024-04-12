const express = require('express');
const { generateNewUrl, getAnalytics } = require('../Controllers/url');

const router = express.Router();

router.post("/",generateNewUrl);

router.get("/analytics/:shortId",getAnalytics)

module.exports = router;