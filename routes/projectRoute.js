const express = require("express");
const { getProjects, getProjectsId, createProjects, updateProjects, deleteProjects } = require("../controllers/projectControllers");
const router = express.Router();

router.route('/').get(getProjects);

router.route('/:id').get(getProjectsId);

router.route('/').post(createProjects);

router.route('/:id').put(updateProjects);

router.route('/:id').delete(deleteProjects);

module.exports = router;