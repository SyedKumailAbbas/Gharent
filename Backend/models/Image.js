
module.exports=(sequelize,DataTypes)=>{
    const Image=sequelize.define("Image",{
          imageurl: {
            type: DataTypes.STRING,
            allowNull: false,
          }
        });
      
        return Image;
    }