const express = require('express')
const router = express.Router()
const movieController = require('../controllers/controller');
// Retrieve all movies
router.get('/', movieController.findAll);
// Create a new movie
router.post('/', movieController.create);
// Retrieve a movie with id
router.get('/:id', movieController.findOne);
// Update a movie with id
router.put('/:id', movieController.update);
// Delete a movie with id
router.delete('/:id', movieController.delete);
module.exports = router