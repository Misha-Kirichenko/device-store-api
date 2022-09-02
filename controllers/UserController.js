const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const { validEmail, validPassword } = require("../helpers/validator");

const genToken = (tokenParams) => {
  const token = jwt.sign(tokenParams, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
};

exports.registration = async (req, res) => {
  const { body } = req;
  const { email, password, fullName } = req.body;
  if (!email || !password || !fullName)
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
      const { fullName, email, role } = created;
      const token = genToken({ fullName, email, role });
      return res.send({ email, token });
    }
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(422).send({ msg: "All inputs required" });

  try {
    const foundUser = await User.findOne({
      where: { email },
    });

    if (foundUser) {
      const passwordsMatch = await bcrypt.compare(password, foundUser.password);
      if (passwordsMatch) {
        const { id, email, role } = foundUser;
        const token = genToken({ id, email, role });
        return res.send({ email, token });
      }
    }
    return res.status(401).send({ msg: "Invalid Credentials" });
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};
