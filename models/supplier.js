"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Supplier.hasMany(models.Laundry, { foreignKey: "laundryId" }),
        models.Supplier.hasMany(models.Review, { foreignKey: "reviewId" });
    }
  }
  Supplier.init(
    {
      supplierId: {
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      email: DataTypes.STRING,
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      cellPhone: DataTypes.STRING,
      laundryId: DataTypes.BIGINT,
      point: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Supplier",
    }
  );
  return Supplier;
};
