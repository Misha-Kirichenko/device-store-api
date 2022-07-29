const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

const { Device } = require("../models");

exports.all = async (req, res) => {
  try {
    const all = await Device.findAll();
    return res.send(all);
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};

exports.add = async (req, res) => {
  const { name, price, brandId, typeId, descr } = req.body;
  const { img } = req.files;
  const whiteList = ["image/jpeg", "image/png"];
  const uploadPath = "./img/device-imgs";
  const errors = [];

  try {
    if (!whiteList.includes(img.mimetype)) {
      errors.push("unsupported file extension");
    }

    if (!name) {
      errors.push("name is required");
    }

    if (!price || isNaN(price)) {
      errors.push("no price or invalid price passed");
    }

    if (!brandId) {
      errors.push("brand id is required");
    }

    if (!typeId) {
      errors.push("type id is required");
    }

    if (!descr) {
      errors.push("description is required");
    }

    if (!errors.length) {
      const imgInfo = img.name.split(".");
      const imgExt = imgInfo[imgInfo.length - 1];
      const fileName = `${uuid.v4()}.${imgExt}`;

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      await img.mv(path.resolve(__dirname, "..", uploadPath, fileName));

      const deviceCreated = await Device.create({
        name,
        price,
        brandId,
        typeId,
        descr,
        img: `device-imgs/${fileName}`,
      });
      if (deviceCreated) this.all(req, res);
    } else {
      return res.status(422).send({ errors });
    }
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};
