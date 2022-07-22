const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { SECRET_KEY } = process.env;

const { validEmail, validPassword } = require("../helpers/validator");

const genToken = (tokenParams) => {
  const token = jwt.sign(tokenParams, SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
};

exports.registration = async (req, res) => {
  const { body } = req;
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(422).send({ msg: "All inputs required" });

  const errors = [];

  if (!validEmail(email)) errors.push("Invalid email");
  if (!validPassword(password)) errors.push("Invalid password");

  if (errors.length) return res.status(422).send({ msg: errors });

  try {
    const found = await User.findOne({ where: { email } });
    if (found)
      return res
        .status(422)
        .send({ msg: "User with such email already exists" });

    body.password = bcrypt.hashSync(password, 10);
    const created = await User.create(body);
    if (created) {
      const { id, email, role } = created;
      const token = genToken({ id, email, role });
      return res.send({ email, token });
    }
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};
