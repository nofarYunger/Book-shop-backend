const express = require('express')
const router = express.Router()
const {
  getAll,
  getOrderById,
  getUserOrders,
  updOrderItems,
  remove,
  saveOrder,
  checkout,
  getBooksByOrderId,
} = require("./orders.controller");

router.get('/',  getAll)
router.get('/:id', getOrderById)
router.get('/user/:id', getUserOrders)
router.get("/books/:OrderId", getBooksByOrderId);

router.post('/:id',updOrderItems)
router.post('/save/:id',saveOrder)
router.post('/checkOut',checkout)

router.delete('/:id',remove)

// need to figure out what to do when a guest make a cart. do i update the server? 
//or just save this at the localstorage antil he sign in . then how do i add the cart? hmm

module.exports = router