const { models } = require("../../models");
const sequelize = require("../../models");

//todo: add filter on the order query

async function getAll(req, res) {
  const orders = await models.Order.findAll({ include: ["CartItem"] });
  res.status(200).json(orders);
}
async function getUserOrders(req, res) {
  try {
    const userId = req.params.userId;
    fooInstance.getBars();
    const orders = await models.Order.findAll({
      where: {
        userId: userId,
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send("error", erorr);
  }
}
async function getOrderById(req, res) {
  const id = req.params.id;
  const order = await models.Order.findByPk(id, { include: ["CartItem"] });
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).send("404 - Not found");
  }
}

async function saveOrder(req, res) {
  const id = req.params.id;
  if (id) {
    if (+req.body.id === +id) {
      await models.Order.update(req.body, {
        where: {
          id: id,
          userId: req.body.userId,
        },
      });
      console.log("updated the order:", id);
      res.status(200).end();
    } else {
      res
        .status(400)
        .send(
          `Bad request: param ID (${id}) does not match body ID (${req.body.id}).`
        );
    }
  } else {
    try {
      await models.Order.create();
      console.log("created a new order");
      res.status(201).end();
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

async function remove(req, res) {
  const id = req.params.id;
  await models.Order.destroy({
    where: {
      id: id,
    },
  });
  await models.CartItem.deleteOrder(id);

  res.status(200).end();
}

// 3 options to upd:
// add a new cartItem , change the quantity, of delete the item from the order
async function updOrderItems(req, res) {
  const { orderId, itemId, bookId, diff } = req.body;
  //maybe i should get the orderId from the logedin user object in the request.
  try {
    if (!itemId) {
      models.CartItem.create({
        orderId,
        bookId,
      });
    } else {
      await models.CartItem.increment(
        { quantity: diff }, //  +1 \ -1
        { where: { id: itemId } }
      ); // Will change the quantity by one

      const { quantity } = models.CartItem.getByPk({ id: itemId });
      if (quantity < 1) {
        await models.CartItem.destroy({
          where: {
            id: itemId,
          },
        });
      }
    }
    res.status(200).end();
  } catch (error) {
    res.status(500).send(err);
    console.log(err);
  }
}

//TODO need to build a checkout function and logic...
async function checkout(req, res) {
  console.log("check out");
}
async function dummyData(req, res) {
  try {
    console.log('dddddddddddddddddddddddddd');
    const order = models.Order.create({ userId: 1 });
    models.CartItem
    order.creatCartItems({ bookId: 1 }, { bookId: 2 });
    console.log({order});
  } catch (error) {
    res.status(500).send(error)
    console.log(error);
  }
}

module.exports = {
  getAll,
  getOrderById,
  getUserOrders,
  updOrderItems,
  remove,
  saveOrder,
  checkout,
  dummyData,
};
