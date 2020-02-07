'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Post extends Model{}

  Post.init({
    title:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
            args:true,
            msg:"Title must be filled"
        },
        len:{
            args:[4],
            msg:"Minimum 4 characters required"
        }
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      // {
      //   args:false,
      //   msg:"URL must be filled"
      // },
      validate:{
        notNull:{
            args:true,
            msg:"URL must be filled"
        },
        isUrl: {
          args: true,
          msg: "URL format wrong"
        }
      }
    },
    tags: {
      type: DataTypes.STRING,
      // allowNull: false,
      // validate:{
      //   notNull:{
      //       args:true,
      //       msg:"Tags must be filled"
      //   }
      // }
    }, 
    UserId: DataTypes.INTEGER
  }, {
    sequelize
  })
  
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User);
  };
  return Post;
};