module.exports = (conn, DataTypes) => {
  const TypeBrand = conn.define(
    "type_brand",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      type_id: { type: DataTypes.INTEGER, allowNull: false },
      brand_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    { timestamps: false }
  );
  return TypeBrand;
};
