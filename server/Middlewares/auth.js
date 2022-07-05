const jwt = require("jsonwebtoken");

const generateToken = (id, email) => {
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token.toString();
};

module.exports = {
  generateToken,
};
