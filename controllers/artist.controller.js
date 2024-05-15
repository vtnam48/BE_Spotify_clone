const Artist = require("../models/artist.model");
const ArtistSong = require("../models/artistSong.model");
const HttpException = require("../utils/HttpException");
const api = require("../utils/baseUrl");

exports.createArtist = async (req, res, next) => {
  console.log(req.body);
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const artist = new Artist({
    id: req.body.id,
    name: req.body.name,
    bgcolor: req.body.bgcolor,
    coverImgUrl: `${api.BASE_URL}/assets/Artist/${req.body.id}.jpg`,
    description: req.body.description,
  });

  if (req.user.type !== "admin") {
    res.status(401).send("you are not admin");
    return;
  }
  if (!req.body.id) {
    Artist.create(artist, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Artist.",
        });
      else res.send({ message: "artist created successfully" });
    });
  } else {
    Artist.findById(req.body.id, (err, data) => {
      if (!err) {
        Artist.updateById(artist.id, artist, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while updating the Artist.",
            });
          else res.send({ message: "artist updated successfully" });
        });
      } else if (err.hasOwnProperty("kind")) {
        Artist.create(artist, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Artist.",
            });
          else res.send({ message: "artist created successfully" });
        });
      } else {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the artist.",
        });
      }
    });
  }
};

exports.getArtistById = async (req, res, next) => {
  Artist.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "Artist not found"));
      } else {
        next(new HttpException(500, "Error retrieving Artist"));
      }
    } else res.send(data);
  });
};

exports.getArtistByName = async (req, res, next) => {
  Artist.findByName(req.params.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "Artist not found"));
      } else {
        next(new HttpException(500, "Error retrieving Artist"));
      }
    } else res.send(data);
  });
};

exports.getAllArtists = async (req, res, next) => {
  if (req.user.type != "admin") {
    res.status(401).send("you are not admin");
  } else {
    Artist.getAll((err, data) => {
      if (err) next(new HttpException(500, "Error retrieving Artists"));
      else res.send(data);
    });
  }
};

exports.getArtistInfoById = async (req, res, next) => {
  let artistInfo, songInfo;
  Artist.findById(req.params.id, (err, data) => {
    if (err) next(new HttpException(500, "Error retrieving artists"));
    else artistInfo = data;
  });
  //get song list
  setTimeout(() => {
    ArtistSong.findByArtistId(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.json({
            ...artistInfo,
            songs: [],
          });
        } else next(new HttpException(500, "Error retrieving songs"));
      } else {
        songInfo = data;
        res.json({
          ...artistInfo,
          songs: songInfo,
        });
      }
    });
  }, 100);
};

exports.updateArtistById = async (req, res, next) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Artist.updateById(req.params.id, new Artist(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "Artist not found"));
      } else {
        next(new HttpException(500, "Error updating Artist"));
      }
    } else res.send(data);
  });
};

exports.deleteArtistById = async (req, res, next) => {
  Artist.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "Artist not found"));
      } else {
        next(new HttpException(500, "Could not delete Artist"));
      }
    } else res.send({ message: "Artist was deleted successfully!" });
  });
};

exports.deleteAllArtists = async (req, res, next) => {
  Artist.removeAll((err, data) => {
    if (err) next(new HttpException(500, "Could not delete Artists"));
    else res.send({ message: "All Artists were deleted successfully!" });
  });
};
