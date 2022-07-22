module.exports = (conn, DataTypes) => {
  const BasketDevice = conn.define(
    "basket_device",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      device_id: { type: DataTypes.INTEGER, allowNull: false },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    { timestamps: false }
  );
  return BasketDevice;
};
