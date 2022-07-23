const { Type } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const all = await Type.findAll();
    return res.send(all);
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};
