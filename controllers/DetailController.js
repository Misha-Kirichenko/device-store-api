const { Detail } = require("../models");
const { Op } = require("sequelize");

exports.all = async (req, res) => {
  try {
    const all = await Detail.findAll();
    return res.send(all);
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};

exports.add = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name || !name.trim()) {
      return res.status(422).send({ msg: "Invalid name or no name send" });
    }
    const detailCreated = await Detail.create({ name });
    if (detailCreated) this.all(req, res);
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Detail.destroy({ where: { id } });
    if (deleted) this.all(req, res);
    else return res.status(404).send({ msg: `row with id: ${id} not found` });
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(422).send({ msg: "Name is required" });
    }
    const detailUpdated = await Detail.update({ name }, { where: { id } });
    if (detailUpdated) this.all(req, res);
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};

exports.massRemove = async (req, res) => {
  const { id_arr } = req.body;
  try {
    const deleted = await Detail.destroy({
      where: { id: { [Op.in]: id_arr } },
    });

    if (deleted) this.all(req, res);
    else return res.status(404).send({ msg: "Nothing to delete" });
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};
