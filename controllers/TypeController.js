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
    if (created) this.getAll(req, res);
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};

exports.removeType = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Type.destroy({
      where: { id },
    });
    if (deleted) this.getAll(req, res);
    else return res.status(404).send({ msg: `row with id:${id} not found!` });
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};
