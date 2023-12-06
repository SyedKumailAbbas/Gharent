
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        uid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey:true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        gender: {
            type: DataTypes.STRING,
            alllowNull: false,
            
        },
        phoneno: {
            type: DataTypes.BIGINT,
            
            validate: {
                notEmpty: true
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
               notEmpty:true
            }

        },

       


    })
    User.associate=(models)=>{
        User.hasMany(models.Post,{
            onDelete:"cascade",
            foreignKey:"uid"
        }),
        User.hasMany(models.Comment,{
            onDelete:"cascade",
            foreignKey:"uid"
        })

    }
    return User
}