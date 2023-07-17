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
        const contact = await Contact.findById(id);
        res.status(200).json(contact);
        res.status(200).json({ message: `Get contact ${id}.` })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
        res.status(500).json({ message: `Get contact ${id}.` })
    }
})

// Create Contact

const createProjects = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { projectName, projectUrl, typeProject } = req.body;
    if (!projectName || !projectUrl || !typeProject) {
        res.status(400);
        throw new Error("All feilds are reuired");
    }
    const project = await Projects.create({
        projectName,
        projectUrl,
        typeProject,
    });
    res.status(200).json(project);
})

// Update Contact
const updateProjects = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All feilds are reuired");
    }
    
    const contact = await Contact.findByIdAndUpdate(id, req.body);
    if (contact.user_id.toString() !== req.userdata.id) {
        res.status(403);
        throw new Error("User don't have permission to Update other user Contacts")
    }

    const updatedContact = await Contact.findById(id);
    res.status(200).json(updatedContact);
    res.status(200).json({ message: `Update contact ${id}.` })
})

// Delete Contact

const deleteProjects = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` })
        }
        if (contact.user_id.toString() !== req.userdata.id) {
            res.status(403);
            throw new Error("User don't have permission to Update other user Contacts")
        }
        await contact.deleteOne({id})
        res.status(200).json({ message: `Deleted successfully`, contact })
        res.status(200).json(contact);
        res.status(200).json({ message: `Delete Contact ${id}.` })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }

})


module.exports = {
    getProjects,
    getProjectsId,
    createProjects,
    updateProjects,
    deleteProjects
};
