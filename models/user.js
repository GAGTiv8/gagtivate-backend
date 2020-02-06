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
          msg:"Email must be filled"
        },
        isEmail : {
          args:true,
          msg:"Email format failed"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        len:{
            args:[6],
            msg:"Minimum 6 characters password required"
        }
      }
    }
  }, {
    sequelize
  })
  
  User.associate = function(models) {
    // associations can be defined here
    
  };
  return User;
};