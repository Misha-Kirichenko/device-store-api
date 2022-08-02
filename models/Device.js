module.exports = (conn, DataTypes) => {
  const Device = conn.define("device", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    descr: { type: DataTypes.TEXT, allowNull: false },
    totalAmount: { type: DataTypes.INTEGER, allowNull: false },
  });
  return Device;
};
