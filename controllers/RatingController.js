const { Rating, Device } = require("../models");

exports.get = async (req, res) => {
  res.send({ user: req.user });
};

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
        .status(422)
        .send({ msg: "this device is already rated by you" });
    }

    try {
      const addedRate = await Rating.create({ rate, userId, deviceId });
      return res.send({ addedRate });
    } catch (err) {
      return res.status(422).send({ msg: err.message });
    }
  }

  return res.status(422).send({ errors });
};

exports.remove = async (req, res) => {};
