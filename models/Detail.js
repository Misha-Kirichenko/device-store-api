module.exports = (conn, DataTypes) => {
  const Detail = conn.define(
    "details",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, unique: true, allowNull: false },
    },
    { timestamps: false }
  );
  return Detail;
};
