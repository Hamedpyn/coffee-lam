const { Schema, default: mongoose } = require("mongoose");

// Mongoose schema
const schema = Schema({
    userName: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String,
        minLength: 8
    },
    role: {
        default: "USER",
        type: String
    },
    img: {
        default: "/images/unknown-person-icon-4.png",
        type: String
    },
    refreshToken: String
});

const UserModel = mongoose.models.User || mongoose.model('User', schema);

export default UserModel;
