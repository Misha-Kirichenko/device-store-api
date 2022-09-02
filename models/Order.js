module.exports = (conn, DataTypes) => {
  const Order = conn.define("order", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cart: { type: DataTypes.JSON, allowNull: false },
  });
  return Order;
};
