const Genre = require('../models/genre.model');
const HttpException = require('../utils/HttpException');

exports.createGenre = async (req, res, next) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: 'Content can not be empty!',
        });
    }

    const genre = new Genre({
        name: req.body.name,
        coverImgUrl: req.body.coverImgUrl,
        bgcolor: req.body.bgcolor,
        description: req.body.description,
        creatAt: req.body.creatAt,
    });

    Genre.create(genre, (err, data) => {
        if (err)
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the Genre.',
        });
        else res.send(data);
    });
}

exports.getGenreById = async (req, res, next) => {
    Genre.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                next(new HttpException(404, 'Genre not found'));
            } else {
                next(new HttpException(500, 'Error retrieving Genre'));
            }
        } else res.send(data);
    });
}

exports.getGenreByName = async (req, res, next) => {
    Genre.findByName(req.params.name, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                next(new HttpException(404, 'Genre not found'));
            } else {
                next(new HttpException(500, 'Error retrieving Genre'));
            }
        } else res.send(data);
    });
}

exports.getAllGenres = async (req, res, next) => {
    Genre.getAll(req.query.name, (err, data) => {
        if (err) next(new HttpException(500, 'Error retrieving Genres'));
        else res.send(data);
    });

}

exports.updateGenreById = async (req, res, next) => {
    Genre.updateById(req.params.id, new Genre(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                next(new HttpException(404, 'Genre not found'));
            } else {
                next(new HttpException(500, 'Error updating Genre'));
            }
        } else res.send(data);
    });
}

exports.deleteGenreById = async (req, res, next) => {
    Genre.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                next(new HttpException(404, 'Genre not found'));
            } else {
                next(new HttpException(500, 'Could not delete Genre'));
            }
        } else res.send({ message: 'Genre was deleted successfully!' });
    });
}
