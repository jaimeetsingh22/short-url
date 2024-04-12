const jwt = require("jsonwebtoken");
const secreteKey = "qwertyuiop";

// isme hum state ko maintain kar rahe hai as statefull authentication
// const sessionIdToUserMap = new Map(); // its hashmap that basically an object which store key value  pairs of SessionID and User Object
// this map is used to keep track of the current state of each input field
// it's keyed by the id attribute of the input element and its value is an object with the following properties:
// in order to determine if a change has been made that requires validation.

// jwt se hoga ye ki page refresh hone ke baad v session logout nahi hoga

function setUser(user) {
  //id,
  // sessionIdToUserMap.set(id,user);
  return jwt.sign(
    // inn datas ka token bana ke dega with secrete key
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secreteKey // ye key data me changes ko allow nahi karne dega until ye ki uske paas nahi hoga
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secreteKey);
  } catch (error) {
    console.log(`Invalid token : ${error}`);
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
