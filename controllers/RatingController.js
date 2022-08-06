const { Rating, Brand, Type, Device, Detail } = require("../models");

exports.add = async (req, res) => {
  const errors = [];
  const { id: userId } = req.user;
  const { id: deviceId } = req.params;
  const { rate } = req.body;

  if (!deviceId.trim()) {
    errors.push("deviceId is required");
  }

  if (!rate || isNaN(rate) || rate < 1 || rate > 5) {
    errors.push("Invalid or no rate passed");
  }

  if (!errors.length) {
    const deviceExists = await Device.count({ where: { id: deviceId } });
    if (!deviceExists) {
      return res.status(404).send({ msg: "device doesn't exist" });
    }

    const rateExist = await Rating.count({ where: { deviceId, userId } });
    if (rateExist) {
      return res
        .status(204)
        .send({ msg: "this device is already rated by you" });
    }

    try {
      const addedRate = await Rating.create({ rate, userId, deviceId });
      if (addedRate)
        return res.send(
          await Device.findAll({
            include: [
              { model: Type },
              { model: Brand },
              { model: Rating },
              { model: Detail },
            ],
          })
        );
    } catch (err) {
      return res.status(422).send({ msg: err.message });
    }
  }

  return res.status(422).send({ errors });
};

exports.remove = async (req, res) => {
  const { id: deviceId } = req.params;
  try {
    const deleted = await Rating.destroy({
      where: { deviceId },
    });
    if (deleted)
      return res.send(
        await Device.findAll({
          include: [
            { model: Type },
            { model: Brand },
            { model: Rating },
            { model: Detail },
          ],
        })
      );
    return res.status(404).send({ msg: "Device rating wasn't found" });
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};
