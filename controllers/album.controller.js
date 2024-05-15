const Album = require("../models/album.model.js");
const Song = require("../models/song.model.js");
const api = require("../utils/baseUrl");
const HttpException = require("../utils/HttpException");

exports.createAlbum = async (req, res, next) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const album = new Album({
    id: req.body.id,
    name: req.body.name,
    bgcolor: req.body.bgcolor,
    coverImgUrl: `${api.BASE_URL}/assets/Album/${req.body.id}.jpg`,
    description: req.body.description,
    artistId: req.body.artistId,
  });

  if (req.user.type !== "admin") {
    res.status(401).send("you are not admin");
    return
  }

  if (!req.body.id) {
    Album.create(album, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Album.",
        });
      else {
        res.send({ message: "album created successfully" });
      }
    });
  } else {
    Album.findById(req.body.id, (err, data) => {
      if (!err) {
        Album.updateById(album.id, album, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while updating the album.",
            });
          else res.send({ message: "album updated successfully" });
        });
      } else if (err.hasOwnProperty("kind")) {
        Album.create(album, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Album.",
            });
          else {
            res.send({ message: "album created successfully" });
          }
        });
      }else{
        res.status(500).send({
          message: err.message || "Some error occurred while creating the album.",
        });
        }
    });
  }
};

exports.getAlbumById = async (req, res, next) => {
  Album.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "Album not found"));
      } else {
        next(new HttpException(500, "Error retrieving Album"));
      }
    } else res.send(data);
  });
};

exports.getAlbumByName = async (req, res, next) => {
  Album.findByName(req.params.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "Album not found"));
      } else {
        next(new HttpException(500, "Error retrieving Album"));
      }
    } else res.send(data);
  });
};

exports.getAllAlbums = async (req, res, next) => {
  if (req.user.type != "admin") {
    res.status(401).send("you are not admin");
  } else {
    Album.getAll((err, data) => {
      if (err) next(new HttpException(500, "Error retrieving Albums"));
      else res.send(data);
    });
  }
};

exports.getAlbumInfoById = async (req, res, next) => {
  let albumInfo, songInfo;
  Album.findById(req.params.id, (err, data) => {
    if (err) next(new HttpException(500, "Error retrieving albums"));
    else albumInfo = data;
  });
  //get song list
  setTimeout(() => {
    Song.findByAlbumId(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.json({
            ...albumInfo,
            songs: [],
          });
        } else next(new HttpException(500, "Error retrieving songs"));
      } else {
        songInfo = data;
        res.json({
          ...albumInfo,
          songs: songInfo,
        });
      }
    });
  }, 100);
};

exports.updateAlbumById = async (req, res, next) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Album.updateById(req.params.id, new Album(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "Album not found"));
      } else {
        next(new HttpException(500, "Error updating Album"));
      }
    } else res.send(data);
  });
};

exports.deleteAlbumById = async (req, res, next) => {
  Album.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "Album not found"));
      } else {
        next(new HttpException(500, "Error deleting Album"));
      }
    } else res.send({ message: `Album was deleted successfully!` });
  });
};

exports.deleteAllAlbums = async (req, res, next) => {
  Album.removeAll((err, data) => {
    if (err) next(new HttpException(500, "Error deleting Albums"));
    else res.send({ message: `All Albums were deleted successfully!` });
  });
};
