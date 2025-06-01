const mongoose = require("mongoose");
require("./Product");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 5,
  },
  isAccept: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: () => Date.now(),
    immutable: false,
  },
  productID: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const commentModel = mongoose.models.Comment || mongoose.model("Comment", schema);

export default commentModel;
