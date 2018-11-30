'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    pseudo: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    has_signed_out: DataTypes.BOOLEAN
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};