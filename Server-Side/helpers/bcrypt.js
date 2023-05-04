const bcrypt = require("bcrypt");

const hashingPassword = (password) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  return hash;
};

const comparePassword = (password, hashed) => {
  return bcrypt.compareSync(password, hashed);
};

module.exports = {
  hashingPassword,
  comparePassword,
};
