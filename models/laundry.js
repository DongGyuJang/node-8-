'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Laundry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Laundry.belongsTo(models.Supplier, {
        foreignKey: 'supplierId',
        onDelete: 'NO ACTION'
      });
      models.Laundry.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        onDelete: 'NO ACTION'
      });
    }
  }
  Laundry.init({
    laundryId: {
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    customerId: DataTypes.BIGINT,
    supplierId: DataTypes.BIGINT,
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    photoURL: DataTypes.STRING,
    request: DataTypes.STRING,
    cellPhone: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Laundry',
  });
  return Laundry;
};