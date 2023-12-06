
module.exports=(sequelize,DataTypes)=>{
    const Image=sequelize.define("Image",{
          imageurl: {
            type: DataTypes.STRING,
            allowNull: false,
          }
        });
      Image.associate=(models)=>{
        Image.belongsTo(models.Post, { foreignKey: 'pid', as: 'Post' });

      }
        return Image;
    }