const userModel = require("../Models/userModel");
const useModel = require("../Models/userModel");

const register = async (user, callback) => {
  const newUser = userModel({ ...user });
  await newUser
    .save()
    .then((result) => {
      return callback(false, { message: "user created successfully" });
    })
    .catch((err) => {
      return callback({ errMessage: "Email already exists", details: err });
    });
};

const login = async (email, callback) => {
  try {
    let user = await userModel.findOne({ email });
    if (!user)
      return callback({
        errMessage:
          "Your email or password is incorrect, please check for errors",
      });
    return callback(false, user);
  } catch (err) {
    return callback({
      errMsg: "OOPS! Something went wrong",
      details: err.message,
    });
  }
};

module.exports = {
  register,
  login,
};
