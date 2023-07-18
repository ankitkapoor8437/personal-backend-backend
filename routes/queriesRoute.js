const express = require("express");
const { getQueries, getQueriesById, createQuery, deleteQuery } = require("../controllers/queriesControllers");

const router = express.Router();

router.route('/').get(getQueries);
router.route('/:id').get(getQueriesById);
router.route('/').post(createQuery);
// router.route('/:id').get();
router.route('/:id').delete(deleteQuery);

module.exports = router;