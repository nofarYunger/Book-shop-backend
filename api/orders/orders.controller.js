const { Order, CartItem, Book } = require("../../models");

//todo: add filter on the order query

async function getAll(req, res) {
  const orders = await Order.findAll({ include: ["CartItem"] });
  res.status(200).json(orders);
}
async function getUserOrders(req, res) {
  try {
    const userId = req.params.userId;
    fooInstance.getBars();
    const orders = await Order.findAll({
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
  const order = await Order.findByPk(id, { include: ["CartItem"] });
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
      await Order.update(req.body, {
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
      await Order.create();
      console.log("created a new order");
      res.status(201).end();
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

async function remove(req, res) {
  const id = req.params.id;
  await Order.destroy({
    where: {
      id,
    },
  });
  await CartItem.deleteOrder(id);

  res.status(200).end();
}

// 3 options to upd:
// add a new cartItem , change the quantity, of delete the item from the order
async function updOrderItems(req, res) {
  const { orderId, bookId, diff } = req.body;
  console.log({ diff });
  //maybe i should get the orderId from the logedin user object in the request.
  console.log("the book is in the backend now");
  try {
    const cartItem = await CartItem.findOne({
      where: {
        bookId,
        orderId,
      },
    });
    console.log({ cartItem });
    //if we're adding a new item to the cart
    if (!cartItem) {
      const newItem = await CartItem.create({
        OrderId: orderId,
        BookId: bookId,
      });
      console.log("new item:", newItem);
    } else {
      const newQuantity = cartItem.quantity + diff;

      if (newQuantity < 1) {
        await cartItem.destroy();
      } else {
        await CartItem.update(
          { quantity: newQuantity },
          { where: { id: cartItem.id } }
        );
      }
    }

    res.status(200).end();
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
}

//TODO need to build a checkout function and logic...
async function checkout(req, res) {
  console.log("check out");

  const { user } = req.body;
  const newOrder = await user.addOrder(await Order.create());
}

async function getBooksByOrderId(req, res) {
  const OrderId = req.params.OrderId;
  try {
    const books = await CartItem.findAll({
      where: { OrderId: req.params.OrderId },
      include: Book,
    });
    console.log(books);
    res.json(books);
  } catch (err) {
    res.send(err);
    console.log(err);
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
  getBooksByOrderId,
};
