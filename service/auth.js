// const sessionIdToUserMap = new Map();

const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

function setUser(user) {
  return jwt.sign({
    _id: user._id,
    email: user._email,

  }, secretKey);

}

function getUser(token) {
  if (!token) return null;
  try{
    return jwt.verify(token, secretKey);
  }
  catch (error) {
    return null;
  }
  
}

module.exports = {
  setUser,
  getUser,
};
