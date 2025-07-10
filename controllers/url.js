const shortid = require("shortid");
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });

  // Check if redirectURL already exists
  const existingURL = await URL.findOne({ redirectURL: body.url });
  if (existingURL) {
    return res.render('home', { id: existingURL.shortId });
    // return res.json({ id: existingURL.shortId });
  }

  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.render('home', { id: shortID } );
  // return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res){
  if (!req.params && req.params.shortId) {
    return res.status(400).json({ error: "shortId is required" });
  }
  const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId});
    return res.json({ 
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    })
}



module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
