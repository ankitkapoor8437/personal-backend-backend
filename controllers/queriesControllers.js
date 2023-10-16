const asyncHandler = require('express-async-handler');

const Queries = require('../models/queriesModel');

// Get queries
const getQueries = asyncHandler(async (req, res) => {
    try {
        const query = await Queries.find();
        res.status(200).json(query);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get queries by Id
const getQueriesById = asyncHandler(async (req, res) => {
    try {
        const query = await Queries.findById(id);
        res.status(200).json(query);
        res.status(200).json({ message: `Get Query ${id}.` })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
        res.status(500).json({ message: `Get project ${id}.` })
    }
})

// Create Query
const createQuery = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        res.status(400);
        throw new Error("All feilds are reuired");
    }
    const query = await Queries.create({
        name,
        email,
        subject,
        message,
    });
    res.status(200).json(query);

})

// Delete Query
const deleteQuery = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const query = await findById(id);
        if (!query) {
            return res.status(404).json({ message: `Cannot find any Query with ID ${id}` });
        }
        await Queries.deleteOne({ _id: id });
        res.status(200).json({ message: `Deleted successfully`, id });
        res.status(200).json(projects); // Removed this line since it's not necessary
        res.status(200).json({ message: `Delete projects ${id}.` }); // Removed this line since it's not necessary

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
})

module.exports = { getQueries, getQueriesById, createQuery, deleteQuery };