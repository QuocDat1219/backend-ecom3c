const Orders = require("../models/orderModel");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { products, namePayment, statusPayment, orderby, totalprice } =
    req.body;
  try {
    Orders.insertMany({
      products: products,
      paymentIntent: {
        name: namePayment,
        status: statusPayment,
      },
      orderby: orderby,
      totalPrice: totalprice,
    }).then((result) => {
      console.log(result);
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
  // console.log(products, namePayment, statusPayment, orderby, totalprice);
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    Orders.find().then((result) => {
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
});

const findOrders = asyncHandler(async (req, res) => {
  const { iduser, orderStatus } = req.query;
  try {
    Orders.find({ orderby: iduser, orderStatus: orderStatus }).then(
      (result) => {
        res.json(result);
      }
    );
  } catch (error) {
    throw new Error(error);
  }
});

const updateOrderCancel = asyncHandler(async (req, res) => {
  const { id, status } = req.body;
  try {
    const updatedOrder = await Orders.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          // orderStatus: "Đơn hàng đã hủy",
          orderStatus: status,
        },
      },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    throw new Error(error);
  }
});

const getOrderByOrderId = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Orders.find({ orderby: id });

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Đơn hàng không tồn tại." });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server." });
  }
});

module.exports = {
  createOrder,
  getAllOrders,
  findOrders,
  updateOrderCancel,
  getOrderByOrderId,
};
