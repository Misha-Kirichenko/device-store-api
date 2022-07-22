module.exports = (conn, DataTypes) => {
  const Rating = conn.define(
    "rating",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      rate: { type: DataTypes.INTEGER, allowNull: false },
    },
    { timestamps: false }
  );
  return Rating;
};
