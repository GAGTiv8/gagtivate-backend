'use strict';
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model{}
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize
  })
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};