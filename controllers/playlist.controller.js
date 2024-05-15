const Playlist = require("../models/playlist.model");
const PlaylistSong = require("../models/playlistSong.model");
const HttpException = require("../utils/HttpException");
const api = require("../utils/baseUrl");

exports.createPlaylist = async (req, res, next) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const playlist = new Playlist({
    name: req.body.name,
    coverImgUrl: req.body.coverImgUrl || "",
    bgcolor: req.body.bgcolor || "rgb(83,83,83)",
    //userId: req.body.userId,
    userId: req.user.id,
    createdAt: new Date(),
    //createdAt: req.body.createdAt,
  });

  Playlist.create(playlist, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Playlist.",
      });
    else res.send(data);
  });
};

exports.createServerPlaylist = async (req, res, next) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  if (req.user.type !== "admin") {
    res.status(401).send("you are not admin");
    return;
  }

  const playlist = new Playlist({
    id: req.body.id,
    name: req.body.name,
    coverImgUrl:
      req.body.coverImgUrl ||
      `${api.BASE_URL}/assets/Playlist/${req.body.id}.jpg`,
    bgcolor: req.body.bgcolor || "rgb(83,83,83)",
    userId: 1,
    createdAt: new Date(),
  });

  Playlist.createServerPlaylist(playlist, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Playlist.",
      });
    else {
      res.status(200).send({
        playlistId: data.id,
      });
    }
  });
};
exports.createServerPlaylistSong = async (req, res, next) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  if (req.user.type !== "admin") {
    res.status(401).send("you are not admin");
    return;
  }

  var error = false;
  req.body.listSongId.every((songId) => {
    console.log(songId);
    PlaylistSong.create(
      { songId: songId, playlistId: req.body.id },
      (err, data) => {
        if (err) {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Playlist.",
          });
          error = true;
          return false;
        }
      }
    );
    return true;
  });

  setTimeout(() => {
    if (!error) res.send("playlist created successfully");
  }, 300);
};

exports.getPlaylistById = async (req, res, next) => {
  Playlist.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "Playlist not found"));
      } else {
        next(new HttpException(500, "Error retrieving Playlist"));
      }
    } else res.send(data);
  });
};

exports.getPlaylistByName = async (req, res, next) => {
  Playlist.findByName(req.params.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "Playlist not found"));
      } else {
        next(new HttpException(500, "Error retrieving Playlist"));
      }
    } else res.send(data);
  });
};

exports.getAllPlaylists = async (req, res, next) => {
  if (req.user.type != "admin") {
    res.status(401).send("you are not admin");
  } else {
    Playlist.getAll((err, data) => {
      if (err) next(new HttpException(500, "Error retrieving Playlists"));
      else res.send(data);
    });
  }
};

//
exports.getPlaylistInfoById = async (req, res, next) => {
  let playlistInfo, songInfo;
  Playlist.findById(req.params.id, (err, data) => {
    if (err) {
      next(new HttpException(500, "Error retrieving Playlists"));
    } else playlistInfo = data;
  });
  //get song list
  setTimeout(() => {
    PlaylistSong.findByPlaylistId(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.json({
            ...playlistInfo,
            songs: [],
          });
        } else next(new HttpException(500, "Error retrieving songs"));
      } else {
        songInfo = data;
        res.json({
          ...playlistInfo,
          songs: songInfo,
        });
      }
    });
  }, 100);
};

exports.getPlaylistByUserId = async (req, res, next) => {
  Playlist.findByUserId(req.user.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "Playlist not found"));
      } else {
        next(new HttpException(500, "Error retrieving Playlist"));
      }
    } else res.send(data);
  });
};

exports.updatePlaylistById = async (req, res, next) => {
  Playlist.updateById(req.params.id, new Playlist(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "Playlist not found"));
      } else {
        next(new HttpException(500, "Error updating Playlist"));
      }
    } else res.send(data);
  });
};

exports.updatePlaylistName = async (req, res, next) => {
  Playlist.updateName(req.params.id, req.body.name, req.file, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "Playlist not found"));
      } else {
        next(new HttpException(500, "Error updating Playlist"));
      }
    } else res.send(data);
  });
};

exports.deletePlaylistById = async (req, res, next) => {
  Playlist.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "Playlist not found"));
      } else {
        next(new HttpException(500, "Could not delete Playlist"));
      }
    } else res.send({ message: "Playlist was deleted successfully!" });
  });
};
