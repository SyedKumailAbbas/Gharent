
module.exports =(sequelize, DataTypes)=>{
    const Post=sequelize.define("Post",{
            pid:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true,
                allowNull:false,
                validate: {
                    notEmpty: true
                }    
            },
            Title:{
                type:DataTypes.STRING,
                allowNull:false,
                validate:{
                    notEmpty:true
                }
            }    ,
            Price:{
                type:DataTypes.INTEGER,
                allowNull:false,
                validate:{
                    notEmpty:true
                }
            },
            Status:{
                type:DataTypes.STRING,
                allowNull:false,
                validate:{
                    notEmpty:true
                }
            },
          

    })
    Post.associate=(models)=>{
        Post.hasMany(models.Comment,{
            foreignKey:"pid",
            onDelete:"CASCADE"
        }),
        Post.hasOne(models.Location,{
            foreignKey:"pid",
            onDelete:"CASCADE",
            onUpdate:"CASCADE"
        }),

        Post.hasOne(models.Image,{
            foreignKey:"pid",
            onDelete:"CASCADE",
            onUpdate:"CASCADE"
        }),
        Post.hasOne(models.Description,{
            foreignKey:"pid",
            onDelete:"CASCADE",
            onUpdate:"CASCADE"
        }),
        Post.belongsTo(models.User, { foreignKey: 'uid', as: 'User' });

        
    }
return Post
}