const Validator = require("fastest-validator");

const v = new Validator();

const productValidationSchema = {
    name: { type: "string", empty: false },
    price: { type: "number", positive: true },
    shortDescription: { type: "string", empty: false },
    longDescription: { type: "string", empty: false },
    weight: { type: "number", positive: true },
    score: { type: "number", optional: true, min: 0, max: 5 },
    tags: { type: "array", items: "string", min: 1 },
    comments: {
        type: "array",
        optional: true,
    },
};

const productValidator = v.compile(productValidationSchema);

module.exports = productValidator;
