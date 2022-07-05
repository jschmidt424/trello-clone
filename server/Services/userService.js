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

module.exports = {
  register,
};
