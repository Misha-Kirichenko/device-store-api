module.exports = (conn, DataTypes) => {
  const DeviceDetail = conn.define(
    "device_detail",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      value: { type: DataTypes.STRING, allowNull: false },
    },
    { timestamps: false }
  );
  return DeviceDetail;
};
