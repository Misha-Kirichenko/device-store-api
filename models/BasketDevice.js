module.exports = (conn, DataTypes) => {
  const BasketDevice = conn.define(
    "basket_device",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    },
    { timestamps: false }
  );
  return BasketDevice;
};
