const Validator = require("fastest-validator");

const v = new Validator();

// Email regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Fastest Validator schema
const userValidationSchema = {
    userName: { type: "string", empty: false },
    email: { type: "string", empty: false, pattern: emailRegex },
    password: { type: "string", min: 8 },
    role: { type: "string", optional: true },
    refreshToken: { type: "string", optional: true }
};

// Example validator function
const userValidator = v.compile(userValidationSchema);
export default userValidator;