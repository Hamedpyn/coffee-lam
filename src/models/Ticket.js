const mongoose = require("mongoose");
require("./Department");
require("./SubDepartment");
require("./User");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    department: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    subDepartment: {
      type: mongoose.Types.ObjectId,
      ref: "subDepartment",
      required: true,
    },
    priority: {
      type: Number,
      default: 1,
      enum: [1, 2, 3],
    },
    hasAnswer: {
      type: Boolean,
      default: false,
    },
    answer: [
      {
        body: {
          type: String,
          default: '',
        },
        userName: {
          type: String,
          default: '',
        },
      }
    ],

    mainTicket: {
      type: mongoose.Types.ObjectId,
      ref: "Ticket",
      required: false,
    },

  },
  {
    timestamps: true,
  }
);

const TicketModel = mongoose.models.Ticket || mongoose.model("Ticket", schema);

export default TicketModel;
