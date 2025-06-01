const Validator = require("fastest-validator");

const v = new Validator();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const commentValidationSchema = {
    username: { type: "string", empty: false, trim: true },
    body: { type: "string", empty: false, trim: true },
    email: { type: "string", empty: false, trim: true, pattern: emailRegex },
    score: { type: "number", optional: true, min: 0, max: 5 },
    isAccept: { type: "boolean", optional: true },
    date: { type: "date", optional: true },
    productID: { type: "string", empty: false },
    user: { type: "string", empty: false },
};

const commentValidator = v.compile(commentValidationSchema);

export default commentValidator
