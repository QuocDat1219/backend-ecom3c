const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: String,
        },
        qty: Number,
      },
    ],
    paymentIntent: {
      name: {
        type: String,
      },
      status: {
        type: String,
      },
    },
    orderStatus: {
      type: String,
      default: "Đang xử lý",
      enum: [
        "Đang xử lý",
        "Đã xác nhận",
        "Đang giao hàng",
        "Đã hủy",
        "Đã giao hàng",
      ],
    },
    orderby: {
      type: String,
    },
    totalPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
