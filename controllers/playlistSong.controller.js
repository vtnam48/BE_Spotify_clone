const PlaylistSong = require("../models/playlistSong.model.js");
const HttpException = require("../utils/HttpException");

exports.createPlaylistSong = async (req, res, next) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const playlistSong = new PlaylistSong({
    songId: req.body.songId,
    playlistId: req.body.playlistId,
  });

  PlaylistSong.create(playlistSong, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PlaylistSong.",
      });
    else res.send(data);
  });
};

exports.getPlaylistSongByIds = async (req, res, next) => {
  PlaylistSong.findByIds(
    req.params.songId,
    req.params.playlistId,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          next(new HttpException(404, "PlaylistSong not found"));
        } else {
          next(new HttpException(500, "Error retrieving PlaylistSong"));
        }
      } else res.send(data);
    }
  );
};

exports.getPlaylistSongBySongId = async (req, res, next) => {
  PlaylistSong.findBySongId(req.params.songId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "PlaylistSong not found"));
      } else {
        next(new HttpException(500, "Error retrieving PlaylistSong"));
      }
    } else res.send(data);
  });
};

exports.getPlaylistSongbyPlayListId = async (req, res, next) => {
  PlaylistSong.findByPlaylistId(req.params.playlistId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "PlaylistSong not found"));
      } else {
        next(new HttpException(500, "Error retrieving PlaylistSong"));
      }
    } else res.send(data);
  });
};

exports.getAllPlaylistSongs = async (req, res, next) => {
  PlaylistSong.getAll(req.query.songId, (err, data) => {
    if (err) next(new HttpException(500, "Error retrieving Songs"));
    else res.send(data);
  });
};

exports.updatePlaylistSongByIds = async (req, res, next) => {
  PlaylistSong.updateByIds(
    req.params.songId,
    req.params.playlistId,
    new PlaylistSong(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          next(new HttpException(404, "PlaylistSong not found"));
        } else {
          next(new HttpException(500, "Error updating PlaylistSong"));
        }
      } else res.send(data);
    }
  );
};

exports.deletePlaylistSongByIds = async (req, res, next) => {
  PlaylistSong.remove(
    req.body.songId,
    req.body.playlistId,
     (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "PlaylistSong not found"));
      } else {
        next(new HttpException(500, "Error deleting PlaylistSong"));
      }
    } else res.send({ message: `PlaylistSong was deleted successfully!` });
  });
};
