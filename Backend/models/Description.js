module.exports = (sequelize,DataTypes) => {
  const Description = sequelize.define('Description', {
    descid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      vslidate:{
        notEmpty:true
      }
    },
    desctxt:{
      type: DataTypes.STRING,
      allowNull: false,

    },
    category:{
      type: DataTypes.STRING,
      allowNull: false,

    },
    bath: {
      type: DataTypes.INTEGER,
      allowNull: false,
      vslidate:{
        notEmpty:true
      }
    },
    bed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      vslidate:{
        notEmpty:true
      }
    },
    area: {
      type: DataTypes.INTEGER, // Adjust data type as needed (e.g., INTEGER, DECIMAL)
      allowNull: false,
      vslidate:{
        notEmpty:true
      }
    },
  });

  return Description;
};
