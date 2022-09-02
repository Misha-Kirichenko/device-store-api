const { conn, Sequelize: DataTypes } = require("../config");
//Create Models
const User = require("./User.js")(conn, DataTypes);
const Device = require("./Device.js")(conn, DataTypes);
const Type = require("./Type.js")(conn, DataTypes);
const Brand = require("./Brand.js")(conn, DataTypes);
const Detail = require("./Detail.js")(conn, DataTypes);
const DeviceDetail = require("./DeviceDetail.js")(conn, DataTypes);
const Rating = require("./Rating.js")(conn, DataTypes);
const Order = require("./Order.js")(conn, DataTypes);
//Establish Relationships
User.hasMany(Rating, { foreignKey: { allowNull: false } });
Rating.belongsTo(User, {
  foreignKey: { allowNull: false },
});
User.hasMany(Order, { foreignKey: { allowNull: false } });

Type.hasMany(Device, {
  foreignKey: { allowNull: false },
});
Device.belongsTo(Type);

Brand.hasMany(Device, {
  foreignKey: { allowNull: false },
});
Device.belongsTo(Brand);

Device.hasMany(Rating, {
  foreignKey: { allowNull: false },
});
Rating.belongsTo(Device);

Detail.belongsToMany(Device, {
  through: DeviceDetail,
});
Device.belongsToMany(Detail, {
  through: DeviceDetail,
  onDelete: "cascade",
});

module.exports = {
  User,
  Device,
  Type,
  Brand,
  Rating,
  Detail,
  DeviceDetail,
  Order,
};
