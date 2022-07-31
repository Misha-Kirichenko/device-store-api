const { Op } = require("sequelize");
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

const { Device, Type, Brand } = require("../models");
const whiteList = ["image/jpeg", "image/png"];
const uploadPath = "./img/device-imgs";

exports.all = async (req, res) => {
  const limit = 2;
  const queryParams = {};

  const { brandId, typeId, minPrice, maxPrice, p, search, sortBy, order } =
    req.query;

  if (brandId) queryParams.brandId = brandId;

  if (typeId) queryParams.typeId = typeId;

  if (minPrice) {
    queryParams.price = {
      ...queryParams.price,
      [Op.gte]: minPrice,
    };
  }

  if (maxPrice) {
    queryParams.price = {
      ...queryParams.price,
      [Op.lte]: maxPrice,
    };
  }

  if (search) {
    queryParams.name = {
      [Op.like]: `%${search}%`,
    };
  }

  try {
    let queryObj = { include: [{ model: Type }, { model: Brand }] };

    if (Object.keys(queryParams).length) {
      queryObj = { ...queryObj, where: queryParams };
    }

    if (p) {
      const offset = p * limit - limit;
      queryObj.limit = limit;
      queryObj.offset = offset;
    }

    if (sortBy) {
      queryObj.order = [[sortBy]];
      if (order) queryObj.order[0].push(order);
      else queryObj.order[0].push("ASC");
    }

    queryObj.attributes = {
      exclude: ["typeId", "brandId"],
    };

    const all = await Device.findAll(queryObj);

    return res.send(all);
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};

exports.add = async (req, res) => {
  const { name, price, brandId, typeId, descr, totalAmount } = req.body;
  const errors = [];

  try {
    if (!req.files) {
      errors.push("image is required");
    } else if (!whiteList.includes(req.files.img.mimetype)) {
      errors.push("unsupported file extension");
    }

    if (!name || !name.trim()) {
      errors.push("name is required");
    }

    if (!price || isNaN(price)) {
      errors.push("no price or invalid value has been passed");
    }

    if (!brandId) {
      errors.push("brand id is required");
    }

    if (!typeId) {
      errors.push("type id is required");
    }

    if (!totalAmount || isNaN(totalAmount)) {
      errors.push("no total amount or invalid value has been pased");
    }

    if (!descr) {
      errors.push("description is required");
    }

    if (!errors.length) {
      const { img } = req.files;
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
        totalAmount,
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

exports.remove = async (req, res) => {
  const { id } = req.params;
  let deviceRow;

  try {
    deviceRow = await Device.findOne({ where: { id } });
    if (!deviceRow)
      return res.status(404).send({ msg: `row with id:${id} not found!` });
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }

  try {
    const { img: imgPath } = deviceRow;
    fs.unlinkSync(`./img/${imgPath}`);
    const deleted = await Device.destroy({ where: { id } });
    if (deleted) this.all(req, res);
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};

exports.one = async (req, res) => {
  const { id } = req.params;
  try {
    const one = await Device.findOne({
      where: { id },
      include: [{ model: Type }, { model: Brand }],
    });
    if (one) return res.send(one);
    else res.status(404).send({ msg: `row with id:${id} not found!` });
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  try {
    const found = await Device.findOne({ where: { id } });
    let fileName;

    if (found) {
      const updateObj = {};
      const errors = [];
      const { name, price, brandId, typeId, descr, totalAmount } = req.body;

      if (
        !name &&
        !price &&
        !brandId &&
        !typeId &&
        !descr &&
        !totalAmount &&
        !req.files
      ) {
        return res
          .status(433)
          .send({ msg: "At least one field must be passed to update device" });
      }

      if (name) {
        if (!name.trim()) errors.push("Invalid name has been passed");
        else updateObj.name = name;
      }

      if (price) {
        if (isNaN(price)) errors.push("Invalid price has been passed");
        else updateObj.price = price;
      }

      if (brandId) {
        if (!brandId.trim()) errors.push("Invalid brandId has been passed");
        else updateObj.brandId = brandId;
      }

      if (typeId) {
        if (!typeId.trim()) errors.push("Invalid typeId has been passed");
        else updateObj.typeId = typeId;
      }

      if (descr) {
        if (!descr.trim()) errors.push("Invalid descr has been passed");
        else updateObj.descr = descr;
      }

      if (totalAmount) {
        if (isNaN(totalAmount))
          errors.push("Invalid totalAmount has been passed");
        else updateObj.totalAmount = totalAmount;
      }

      if (req.files) {
        if (!whiteList.includes(req.files.img.mimetype))
          errors.push("unsupported file extension");
        else {
          const imgInfo = req.files.img.name.split(".");
          const imgExt = imgInfo[imgInfo.length - 1];
          fileName = `${uuid.v4()}.${imgExt}`;
          updateObj.img = `device-imgs/${fileName}`;
        }
      }

      if (errors.length) return res.status(422).send({ errors });
      else {
        const { img } = req.files;
        const { img: imgPath } = found;
        fs.unlinkSync(`./img/${imgPath}`);
        await img.mv(path.resolve(__dirname, "..", uploadPath, fileName));
        const deviceUpdate = await Device.update(updateObj, { where: { id } });
        if (deviceUpdate) this.all(req, res);
      }
    } else res.status(404).send({ msg: `row with id:${id} not found!` });
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};
