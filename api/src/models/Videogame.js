const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      isUrl: true
    },
    released: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.FLOAT,
      isFloat: true,
      max: 5
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },{
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
  });
};
