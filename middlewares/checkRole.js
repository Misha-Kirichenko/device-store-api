const checkRole = (req, res, next) => {
  const { role } = req.user;
  if (role !== "ADMIN") return res.status(403).send({ msg: "Access Denied!" });
  return next();
};

module.exports = checkRole;
