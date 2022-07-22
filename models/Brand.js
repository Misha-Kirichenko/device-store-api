module.exports = (conn, DataTypes) => {
  const Brand = conn.define(
    "brand",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, unique: true, allowNull: false },
    },
    { timestamps: false }
  );
  return Brand;
};
