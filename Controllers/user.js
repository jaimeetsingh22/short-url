const User = require("../Model/user");
// const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");

const userSignUp = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });
  return res.redirect("/");
};
const userLogIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    res.render("login", {
      error: "Email or Password is incorrect",
    });

  // const sessionId = uuidv4(); // these are for statefull

  // setUser(sessionId, user);

  const token = setUser(user); // yaha user ka bheja hua data ka token bana ke de dega

  res.cookie("token", token); // cookie basically ek file hota hai jo ki browser me store ho jata hai as state

  return res.redirect("/");

  // return res.json({token});
};

module.exports = { userSignUp, userLogIn };
