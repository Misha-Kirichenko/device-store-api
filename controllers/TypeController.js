const { Type } = require("../models");

exports.all = async (req, res) => {
  try {
    const all = await Type.findAll();
    return res.send(all);
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};

exports.add = async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(422).send({ msg: "Name is required!" });
  try {
    const created = await Type.create({ name });
    if (created) this.all(req, res);
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Type.destroy({
      where: { id },
    });
    if (deleted) this.all(req, res);
    else return res.status(404).send({ msg: `row with id:${id} not found!` });
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};

exports.edit = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.body.hasOwnProperty("name")) {
      return res.status(422).send({ msg: "type name is required" });
    }

    const { name } = req.body;

    if (!name.trim()) {
      return res.status(422).send({ msg: "invalid name passed" });
    }

    const updated = await Type.update(
      { name },
      {
        where: { id },
      }
    );

    if (updated) this.all(req, res);
    else return res.status(404).send({ msg: `row with id:${id} not found!` });
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};
