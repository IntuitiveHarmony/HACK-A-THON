const mongoose = require('mongoose');


const employeesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"]
        },
        image: {
            type: String,
            required: [true, "Please provide the URL for an image"]
        },
        role: {
            type: String,
            default: "Grunt"
        },
        employeeId: String,
    },
    {
        timestamps: true
    }
);


const Employees = mongoose.model('Employee', employeesSchema);

module.exports = Employees;