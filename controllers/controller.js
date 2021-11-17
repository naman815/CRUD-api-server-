const Movie = require('../model/movie.model');

// Read
exports.findAll = (req, res) => {
    Movie.find()
    .then(movies => {
    res.send(movies);
    }).catch(err => {
    res.status(500).send({
    message: err.message || "Something went wrong while getting list of users."
    });
    });
};

// Create 
exports.create = (req, res) => {

    if(!req.body) {
    return res.status(400).send({
    message: "Please fill all required field"
    });
    }
    
    const movie = new Movie({
        name : req.body.name,
        img : req.body.img,
        summary : req.body.summary
    });
    // Save data in the database
    movie.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
    res.status(500).send({
    message: err.message || "Something went wrong while creating new user."
    });
    });
};



// Find a movie by its id
exports.findOne = (req, res) => {
    
    
    Movie.findById(req.params.id)
    .then(movie => {
    if(!movie) {
    return res.status(404).send({
    message: "Movie not found with id " + req.params.id
    });
    }
    res.send(movie);
    }).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
        message: "Movie not found with id " + req.params.id
    });
    }
    return res.status(500).send({
    message: "Error getting movie with id " + req.params.id
    });
    });
};

// Update a movie data identified by the id in the request
exports.update = (req, res) => {
// Validate Request
    if(!req.body) {
    return res.status(400).send({
    message: "Please fill all required field"
    });
    }
    
    Movie.findByIdAndUpdate(req.params.id, {
        name : req.body.name,
        img : req.body.img,
        summary : req.body.summary
    }, {new: true})
    .then(movie => {
    if(!movie) {
    return res.status(404).send({
    message: "movie not found with id " + req.params.id
    });
    }
    res.send(movie);
    }).catch(err => {
    if(err.kind === 'ObjectId') {
    return res.status(404).send({
    message: "movie not found with id " + req.params.id
    });
    }
    return res.status(500).send({
    message: "Error updating movie with id " + req.params.id
    });
    });
};
// Delete a movie record from database
exports.delete = (req, res) => {
    Movie.findByIdAndRemove(req.params.id)
    .then(movie => {
    if(!movie) {
    return res.status(404).send({
    message: "movie not found with id " + req.params.id
    });
    }
    res.send({message: "movie deleted successfully!"});
    }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
    return res.status(404).send({
    message: "movie not found with id " + req.params.id
    });
    }
    return res.status(500).send({
    message: "Could not delete movie with id " + req.params.id
    });
    });
};