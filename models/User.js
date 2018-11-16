const Sequelize = require("sequelize");
const sequelize = require("./Database");
const bcrypt = require("bcrypt-nodejs");

exports.Model = sequelize.define(
  "user",
  {
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true
  }
);

exports.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return callback(err);

    callback(null, isMatch);
  });
};
