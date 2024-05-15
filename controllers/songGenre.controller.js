const SongGenre = require("../models/songGenre.model.js");
const HttpException = require("../utils/HttpException");

exports.createSongGenre = async (req, res, next) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const songGenre = new SongGenre({
    songId: req.body.songId,
    genreId: req.body.genreId,
  });

  SongGenre.create(songGenre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the SongGenre.",
      });
    else res.send(data);
  });
};

exports.getSongGenreByIds = async (req, res, next) => {
  SongGenre.findByIds(
    req.params.songId,
    req.params.genreId,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          next(new HttpException(404, "SongGenre not found"));
        } else {
          next(new HttpException(500, "Error retrieving SongGenre"));
        }
      } else res.send(data);
    }
  );
};

exports.getSongGenreBySongId = async (req, res, next) => {
  SongGenre.findBySongId(req.params.songId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "SongGenre not found"));
      } else {
        next(new HttpException(500, "Error retrieving SongGenre"));
      }
    } else res.send(data);
  });
};

exports.getSongByGenreId = async (req, res, next) => {
  SongGenre.findByGenreId(req.params.genreId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "SongGenre not found"));
      } else {
        next(new HttpException(500, "Error retrieving SongGenre"));
      }
    } else res.send(data);
  });
  
  // for later use
  // result = await SongGenre.findByGenreId(req.params.genreId)
  // res.send(result)
};

exports.getAllSongGenres = async (req, res, next) => {
  SongGenre.getAll(req.query.songId, (err, data) => {
    if (err) next(new HttpException(500, "Error retrieving Songs"));
    else res.send(data);
  });
};

exports.updateSongGenreByIds = async (req, res, next) => {
  SongGenre.updateByIds(
    req.params.songId,
    req.params.genreId,
    new SongGenre(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          next(new HttpException(404, "SongGenre not found"));
        } else {
          next(new HttpException(500, "Error updating SongGenre"));
        }
      } else res.send(data);
    }
  );
};

exports.deleteSongGenreByIds = async (req, res, next) => {
  SongGenre.remove(
    req.params.songId,
    req.params.genreId,
     (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "SongGenre not found"));
      } else {
        next(new HttpException(500, "Error deleting SongGenre"));
      }
    } else res.send({ message: `SongGenre was deleted successfully!` });
  });
};
