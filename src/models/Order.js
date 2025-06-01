const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  code: {
    type: String,
    default: "",
  },
  product: [
    {
      id: { type: mongoose.Types.ObjectId, ref: "Product" },
      count: { type: Number, required: true },
    },
  ],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: () => Date.now(),
    immutable: false,
  },
});

const orderModel = mongoose.models.Order || mongoose.model("Order", schema);
export default orderModel;
