const { Op } = require("sequelize");
const { Order, Device } = require("../models");

exports.all = async (req, res) => {
  const { id: userId } = req.user;
  try {
    const ordersList = [];
    const orderIds = [];
    const orderAmounts = [];
    const orders = await Order.findAll({ where: { userId } });

    for (let order of orders) {
      const { cart } = order;
      const idArr = Object.keys(cart);
      const valArr = Object.values(cart);
      orderIds.push(...idArr);
      orderAmounts.push(...valArr);

      Promise.all(
        await Device.findAll({
          where: {
            id: {
              [Op.in]: orderIds
            }
          }
        })
      ).then((orders) => {
        const finalDevices = orders.map((device, i) => {
          return { ...device.dataValues, amount: orderAmounts[i] };
        });
        ordersList.push(finalDevices);
        res.send(ordersList);
      });
    }
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }
};
