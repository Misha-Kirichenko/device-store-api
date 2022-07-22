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
//Establish Relationships
User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });
Rating.belongsTo(User, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

Basket.hasMany(BasketDevice, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
BasketDevice.belongsTo(Basket);

Type.hasMany(Device, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
Device.belongsTo(Type);

Brand.hasMany(Device, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
Device.belongsTo(Brand);

Device.hasMany(Rating, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
Rating.belongsTo(Device);

Device.hasMany(BasketDevice, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
BasketDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, {
  as: "info",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
DeviceInfo.belongsTo(Device);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

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
