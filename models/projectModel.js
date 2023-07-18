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
        description: {
            type: String,
            required:[true, "Description of Project"]
        },
        typeProject: {
            type: String,
            required:[true, "Type of the Project"]
        },
        image: {
            type: String,
            required:[true, "Image of the project."]
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Projects", projectSchema);