"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Customer.hasMany(models.Laundry, { foreignKey: "laundryId" }),
        models.Customer.hasMany(models.Review, { foreignKey: "reviewId" });
    }
  }
  Customer.init(
    {
      customerId: {
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      nickname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      cellPhone: DataTypes.STRING,
      laundryId: DataTypes.BIGINT,
      point: {
        type: DataTypes.INTEGER,
        defaultValue: 1000000,
      },
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
