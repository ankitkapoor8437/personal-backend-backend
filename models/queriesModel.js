const mongoose = require("mongoose");

const queriesSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        message: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Queries", queriesSchema);