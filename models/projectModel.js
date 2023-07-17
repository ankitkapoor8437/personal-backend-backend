const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
    {
        projectName: {
            type: String,
            required:[true, "Project Name is required"]
        },
        projectUrl: {
            type: String,
            required:[true, "URL is required"]
        },
        typeProject: {
            type: String,
            required:[true, "Type of the proeject"]
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Projects", projectSchema);