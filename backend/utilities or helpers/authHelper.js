const bcrypt = require("bcrypt");

module.exports.hashPassword = (password) => {
  const saltRounds = 10;
  const hashPassword = bcrypt.hash(password, saltRounds);
  return hashPassword;
};

module.exports.comparePassword = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};
