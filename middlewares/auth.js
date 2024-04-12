const { getUser } = require("../services/auth");

function checkForAuthentication(req, res, next) {
  // const authorizationHeaderValue = req.headers["authorization"]; // its for mobile applications
  const tokenCookies = req.cookies.token;
  req.user = null;

  // if (
  //   !authorizationHeaderValue ||
  //   !authorizationHeaderValue.startsWith("Bearer")
  // )
  //   return next();

  // const token = authorizationHeaderValue.split("Brearer ")[1]; //Split a string into substrings using the specified separator and return them as an array.

  if (!tokenCookies) return next();

  const user = getUser(tokenCookies);
  req.user = user;
  next();
}

// async function restrictToLoggedInUserOnly(req, res, next) {
//   // const userUid = req.cookies?.uid;
//   const userUid = req.headers["authorization"]; // "Bearer asjdhdf7tjd87sdjdh8dfj7"

//   if (!userUid) return res.redirect("/login");
//   const token = userUid.split("Bearer ")[1]; // ['Bearer', 'asjdhdf7tjd87sdjdh8dfj7' ]

//   // const user = getUser(userUid);
//   const user = getUser(token);
//   // If the user is not found in our database we redirect to login page with an error message
//   if (!user)
//     return res
//       .status(401)
//       .redirect("/login?error=You must be logged in to view this resource.");

//   req.user = user; // ye hum bhejenge apne urlSchema model ko
//   next();
// }

// async function checkAuth(req, res, next) {
//   console.log(req.headers);
//   // const userUid = req.cookies?.uid;
//   const userUid = req.headers["authorization"];
//   const token = userUid.split("Bearer ")[1];

//   // const user = getUser(userUid);
//   const user = getUser(token);

//   req.user = user; // ye hum bhejenge apne urlSchema model ko
//   next();
// }

function restrictTo(role = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    if (!role.includes(req.user.role)) return res.send("UnAutorized");

    return next();
  };
}

module.exports = {
  // restrictToLoggedInUserOnly,
  // checkAuth

  checkForAuthentication,
  restrictTo,
};
