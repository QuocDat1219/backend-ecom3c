const express = require("express");
const {
  createOrder,
  getAllOrders,
  findOrders,
  updateOrderCancel,
  getOrderByOrderId,
} = require("../controller/orderCtrl");
const router = express.Router();

router.post("/createOrder", createOrder);
router.get("/getallorder", getAllOrders);
router.get("/findoder", findOrders);
router.post("/cancleOder", updateOrderCancel);
router.get("/getorderuser/:id", getOrderByOrderId);
module.exports = router;
