const { conn, Sequelize: DataTypes } = require("../config");
//Create Models
const User = require("./User.js")(conn, DataTypes);
const Device = require("./Device.js")(conn, DataTypes);
const Basket = require("./Basket.js")(conn, DataTypes);
const BasketDevice = require("./BasketDevice.js")(conn, DataTypes);
const DeviceInfo = require("./DeviceInfo.js")(conn, DataTypes);
const Type = require("./Type.js")(conn, DataTypes);
const Brand = require("./Brand.js")(conn, DataTypes);
const TypeBrand = require("./TypeBrand.js")(conn, DataTypes);
const Rating = require("./Rating.js")(conn, DataTypes);

module.exports = {
  User,
  Basket,
  BasketDevice,
  Device,
  Type,
  Brand,
  Rating,
  TypeBrand,
  DeviceInfo,
};
