const Url = require("../Model/url");
const shortid = require("shortid");

const generateNewUrl = async (req, res) => {
  const shortId = shortid(8); //generate a random alphanumeric string of length
  const body = req.body;
  if (!body) return res.status(400).json({ error: "You must provide url" });
  await Url.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy:req.user._id,
  });

  return res.render("home", {
    id: shortId,
  });

  // return res.json({ shortId: `http://localhost:3000/${shortId}` });
};

const getAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await Url.findOne({ shortId });

  res.json({
    totalVisits: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

module.exports = {
  generateNewUrl,
  getAnalytics,
};

//
