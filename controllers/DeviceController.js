const uuid = require("uuid");
const path = require("path");

const { Device } = require("../models");

exports.add = async (req, res) => {
  const { name, price, brandId, typeId, descr } = req.body;
  const { img } = req.files;
  const whiteList = ["image/jpeg", "image/png"];
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

      await img.mv(path.resolve(__dirname, "..", "img/device-imgs", fileName));

      const deviceCreated = await Device.create({
        name,
        price,
        brandId,
        typeId,
        descr,
        img: `device-imgs/${fileName}`,
      });

      if (deviceCreated) return res.send({ msg: "Device created!" });
    }
    return res.status(422).send({ errors });
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};
