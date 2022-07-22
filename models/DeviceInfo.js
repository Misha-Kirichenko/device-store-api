module.exports = (conn, DataTypes) => {
  const DeviceInfo = conn.define(
    "device_info",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
    },
    { timestamps: false }
  );
  return DeviceInfo;
};
