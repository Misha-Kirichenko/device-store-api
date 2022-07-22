module.exports = (conn, DataTypes) => {
  const Type = conn.define(
    "type",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, unique: true, allowNull: false },
    },
    { timestamps: false }
  );
  return Type;
};
