const Validator = require("fastest-validator");

const v = new Validator();

const ticketValidationSchema = {
    title: { type: "string", empty: false },
    body: { type: "string", empty: false },
    department: { type: "string" },
    subDepartment: { type: "string" },
    priority: { type: "number", optional: true, enum: [1, 2, 3], default: 1 },
};

const ticketValidator = v.compile(ticketValidationSchema);

module.exports = ticketValidator;
