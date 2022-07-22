module.exports = (conn, DataTypes) => {
  const TypeBrand = conn.define(
    "type_brand",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    },
    { timestamps: false }
  );
  return TypeBrand;
};
