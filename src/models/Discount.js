const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    percent: {
      type: Number,
      required: true,
    },
    maxUse: {
      type: Number,
      required: true,
    },
    uses: {
      type: Number,
      default: 0,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DisCountModel = mongoose.models.Discount || mongoose.model("Discount", schema);

export default DisCountModel;
