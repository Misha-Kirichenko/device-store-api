const { Type } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const all = await Type.findAll();
    return res.send(all);
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};

exports.addType = async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(422).send({ msg: "Name is required!" });
  try {
    const created = await Type.create({ name });
    if (created) return res.send(await this.getAll(req, res));
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};
