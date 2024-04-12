const express = require("express");
const Url = require("../Model/url");
const { restrictTo } = require("../middlewares/auth");

const router = express.Router();

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => { // inline middleware

  const allUrls = await Url.find({});

  res.render("home", {
    urls: allUrls,
  });
});
router.get("/", restrictTo(["NORMAL","ADMIN"]), async (req, res) => { // inline middleware
  // if (!req.user) return res.redirect("/login");

  const allUrls = await Url.find({ createdBy: req.user._id }); // isse ye hoga ki ye sirf usi urls dega jiska database se match kar jayega

  res.render("home", {
    urls: allUrls,
  });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
