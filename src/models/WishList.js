const mongoose = require("mongoose");
require("./Product");
require("./User");

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
    },
});

const WishListModel = mongoose.models.WishList || mongoose.model("WishList", schema);

export default WishListModel;
