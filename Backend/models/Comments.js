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

return Comment
}