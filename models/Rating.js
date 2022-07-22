module.exports = (conn, DataTypes) => {
  const Rating = conn.define("rating", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    device_id: { type: DataTypes.INTEGER, allowNull: false },
    rate: { type: DataTypes.INTEGER, allowNull: false },
  });
  return Rating;
};
