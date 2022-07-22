module.exports = (conn, DataTypes) => {
  const Basket = conn.define(
    "basket",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    { timestamps: false }
  );
  return Basket;
};
