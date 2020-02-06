'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  
  class User extends Model{}

  User.init({
    email: {
      type : DataTypes.STRING,
      isUnique: true,
      validate: {
        notEmpty:{
          args:true,
          msg:"Not Empty Require"
        },
        isEmail : {
          args:true,
          msg:"Not Email Format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        len:{
            args:[6],
            msg:"Minimum 6 characters required"
        }
      }
    }
  }, {
    sequelize
  })

  User.associate = function(models)  {
    // associations can be defined here
    User.hasMany(models.Post);
  };
  return User;
};