const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

const BanModel = mongoose.models.Ban || mongoose.model("Ban", schema);

export default BanModel;
