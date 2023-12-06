module.exports=(sequelize,DataTypes)=>{
const Comment=sequelize.define("Comment",{
    Comment_Body:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    }
})
Comment.associate=(models)=>{
Comment.belongsTo(models.User, { foreignKey: 'uid', as: 'User' });
}
return Comment
}