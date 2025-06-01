const Validator = require("fastest-validator");

const v = new Validator();

const wishListValidationSchema = {
    user: { type: "string", empty: false },
    product: { type: "string", empty: false },
};

const wishListValidator = v.compile(wishListValidationSchema);

export default wishListValidator;
