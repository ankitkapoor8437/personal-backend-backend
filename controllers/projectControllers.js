const asyncHandler = require('express-async-handler');

const Projects = require('../models/projectModel')

// Get Contact
const getProjects = asyncHandler(async (req, res) => {
    try {
        const project = await Projects.find();
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get contact by id

const getProjectsId = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Projects.findById(id);
        res.status(200).json(project);
        res.status(200).json({ message: `Get project ${id}.` })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
        res.status(500).json({ message: `Get project ${id}.` })
    }
})

// Create Contact

const createProjects = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { projectName, projectUrl, description, typeProject, image } = req.body;
    if (!projectName || !projectUrl || !typeProject) {
        res.status(400);
        throw new Error("All feilds are reuired");
    }
    const project = await Projects.create({
        projectName,
        projectUrl,
        description,
        typeProject,
        image,
    });
    res.status(200).json(project);
})

// Update Contact
const updateProjects = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { projectName, projectUrl, description, typeProject, image } = req.body;
    
    const project = await Projects.findByIdAndUpdate(id, req.body);
    // if (contact.user_id.toString() !== req.userdata.id) {
    //     res.status(403);
    //     throw new Error("User doesn't have permission to update other user contacts");
    // }
    if (!project) {
        return res.status(404).json({ message: `Cannot find any project with ID ${id}` });
    }

    const updatedProjects = await Projects.findById(id);
    res.status(200).json({ message: `Updated Project ${id}.`, updatedProjects });
});

// Delete Contact

const deleteProjects = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const projects = await Projects.findById(id);
        if (!projects) {
            return res.status(404).json({ message: `Cannot find any projects with ID ${id}` });
        }
        // if (contact.user_id.toString() !== req.userdata.id) {
        //     res.status(403);
        //     throw new Error("User doesn't have permission to update other user contacts");
        // }
        await Projects.deleteOne({ _id: id }); // Corrected the parameter to "_id"
        res.status(200).json({ message: `Deleted successfully`, id });
        res.status(200).json(projects); // Removed this line since it's not necessary
        res.status(200).json({ message: `Delete projects ${id}.` }); // Removed this line since it's not necessary
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});


module.exports = {
    getProjects,
    getProjectsId,
    createProjects,
    updateProjects,
    deleteProjects
};
