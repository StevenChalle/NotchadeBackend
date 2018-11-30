'use strict';
module.exports = (sequelize, DataTypes) => {
  const topics = sequelize.define('topics', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  topics.associate = function(models) {
    // associations can be defined here
  };
  return topics;
};