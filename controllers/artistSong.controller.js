const ArtistSong = require("../models/artistSong.model.js");
const HttpException = require("../utils/HttpException");

exports.createArtistSong = async (req, res, next) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const artistSong = new ArtistSong({
    songId: req.body.songId,
    artistId: req.body.artistId,
  });

  ArtistSong.create(artistSong, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ArtistSong.",
      });
    else res.send(data);
  });
};

exports.getArtistSongByIds = async (req, res, next) => {
  ArtistSong.findByIds(
    req.params.songId,
    req.params.artistId,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          next(new HttpException(404, "ArtistSong not found"));
        } else {
          next(new HttpException(500, "Error retrieving ArtistSong"));
        }
      } else res.send(data);
    }
  );
};

exports.getArtistSongBySongId = async (req, res, next) => {
  ArtistSong.findBySongId(req.params.songId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "ArtistSong not found"));
      } else {
        next(new HttpException(500, "Error retrieving ArtistSong"));
      }
    } else res.send(data);
  });
};

exports.getArtistSongbyArtistId = async (req, res, next) => {
  ArtistSong.findByArtistId(req.params.artistId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "ArtistSong not found"));
      } else {
        next(new HttpException(500, "Error retrieving ArtistSong"));
      }
    } else res.send(data);
  });
};

exports.getAllArtistSongs = async (req, res, next) => {
  ArtistSong.getAll(req.query.songId, (err, data) => {
    if (err) next(new HttpException(500, "Error retrieving Songs"));
    else res.send(data);
  });
};

exports.updateArtistSongByIds = async (req, res, next) => {
  ArtistSong.updateByIds(
    req.params.songId,
    req.params.artistId,
    new ArtistSong(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          next(new HttpException(404, "ArtistSong not found"));
        } else {
          next(new HttpException(500, "Error updating ArtistSong"));
        }
      } else res.send(data);
    }
  );
};

exports.deleteArtistSongByIds = async (req, res, next) => {
  ArtistSong.remove(
    req.params.songId,
    req.params.artistId,
     (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "ArtistSong not found"));
      } else {
        next(new HttpException(500, "Error deleting ArtistSong"));
      }
    } else res.send({ message: `ArtistSong was deleted successfully!` });
  });
};
