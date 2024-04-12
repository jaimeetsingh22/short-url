const express = require("express");
const { userSignUp, userLogIn } = require("../Controllers/user");

const router = express.Router();

router.post("/", userSignUp);

router.post("/login", userLogIn);

module.exports = router;
