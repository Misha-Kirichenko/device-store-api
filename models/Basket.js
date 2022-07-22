module.exports = (conn, DataTypes) => {
  const Basket = conn.define(
    "basket",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    },
    { timestamps: false }
  );
  return Basket;
};
