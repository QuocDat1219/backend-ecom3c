const express = require("express");
const {
  createOrder,
  getAllOrders,
  findOrders,
  updateOrderCancel,
  getOrderByOrderId,
  deleteOrder,
} = require("../controller/orderCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware")
const router = express.Router();

router.delete("/delete-orders/:id", deleteOrder);
router.post("/createOrder", createOrder);
router.get("/getallorder", getAllOrders);
router.get("/findoder", findOrders);
router.post("/cancleOder", updateOrderCancel);
router.get("/getorderuser/:id", getOrderByOrderId);

module.exports = router;
