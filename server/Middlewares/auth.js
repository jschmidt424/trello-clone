const jwt = require("jsonwebtoken");

const generateToken = (id, email) => {
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token.toString();
};

const verifyToken = (req, res, next) => {
  try {
    if (!req.headers["authorization"])
      return res
        .status(401)
        .send({ errMessage: "Authorization token not found!" });

    const header = req.headers["authorization"];
    const token = header.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, verifiedToken) => {
      if (err)
        return res
          .status(401)
          .send({ errMessage: "Authorization token invalid", details: err });
      req.body.user = verifiedToken;
      next();
    });
  } catch (error) {
    return res.status(500).send({
      errMessage: "Internal server error occurred!",
      details: error.message,
    });
  }
};

module.exports = {
  generateToken,
};
