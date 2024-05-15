const Song = require("../models/song.model.js");
const Album = require("../models/album.model.js");
const ArtistSong = require("../models/artistSong.model.js");
const SongGenre = require("../models/songGenre.model.js");
const HttpException = require("../utils/HttpException");
const api = require("../utils/baseUrl");
const path = require("path");

exports.createSong = async (req, res, next) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const song = new Song({
    id: req.body.id,
    name: req.body.name,
    audioUrl: `${api.BASE_URL}/assets/Song/audio/${req.body.id}.mp3`,
    coverImgUrl: `${api.BASE_URL}/assets/Song/image/${req.body.id}.jpg`,
    albumId: req.body.albumId,
    description: req.body.description,
    duration: req.body.duration,
    bgcolor: req.body.bgcolor,
  });

  if (req.user.type !== "admin") {
    res.status(401).send("you are not admin");
    return;
  }

  if (!req.body.id) {
    Song.create(song, (err, songRes) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Song.",
        });
      else {
        SongGenre.create(
          { songId: songRes.id, genreId: req.body.genreId },
          (err, data) => {
            if (err)
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Song.",
              });
            else {
              ArtistSong.create(
                { songId: songRes.id, artistId: req.body.artistId },
                (err, data) => {
                  if (err)
                    res.status(500).send({
                      message:
                        err.message ||
                        "Some error occurred while creating the Song.",
                    });
                  else {
                    res.send({ message: "song created successfully" });
                  }
                }
              );
            }
          }
        );
      }
    });
  } else {
    Song.findById(req.body.id, (err, data) => {
      if (!err) {
        ArtistSong.updateBySongId(song.id, req.body.artistId, (err, data) => {
          if (err) {
            res.status(500).send({
              message:
                err.message || "Some error occurred while updating the Song.",
            });
            return;
          } else {
            SongGenre.updateBySongId(song.id, req.body.genreId, (err, data) => {
              if (err) {
                res.status(500).send({
                  message:
                    err.message ||
                    "Some error occurred while updating the Song.",
                });
                return;
              } else {
                Song.updateById(req.body.id, song, (err, data) => {
                  if (err)
                    res.status(500).send({
                      message:
                        err.message ||
                        "Some error occurred while updating the Song.",
                    });
                  else {
                    res.send({ message: "song updated successfully" });
                  }
                });
              }
            });
          }
        });
      } else if (err.hasOwnProperty("kind")) {
        Song.create(song, (err, data) => {
          if (err) {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Song.",
            });
            return;
          } else {
            ArtistSong.create(
              { songId: song.id, artistId: req.body.artistId },
              (err, data) => {
                if (err) {
                  res.status(500).send({
                    message:
                      err.message ||
                      "Some error occurred while creating the Song.",
                  });
                  Song.remove(song.id, (err, res) =>{})
                  return;
                } else {
                  SongGenre.create(
                    { songId: song.id, genreId: req.body.genreId },
                    (err, data) => {
                      if (err) {
                        res.status(500).send({
                          message:
                            err.message ||
                            "Some error occurred while creating the Song.",
                        });
                        Song.remove(song.id, (err, res) =>{})
                        return;
                      } else {
                        res.send({ message: "song created successfully" });
                      }
                    }
                  );
                }
              }
            );
          }
        });
      } else {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Song.",
        });
      }
    });
  }
};

exports.getSongById = async (req, res, next) => {
  Song.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: "song not found" });
      } else {
        res.status(500).send({ message: "Error retrieving Song" });
      }
    } else res.send(data);
  });
};

exports.getSongByName = async (req, res, next) => {
  Song.findByName(req.params.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "Song not found"));
      } else {
        next(new HttpException(500, "Error retrieving Song"));
      }
    } else res.send(data);
  });
};

exports.getAllSongs = async (req, res, next) => {
  if (req.user.type != "admin") {
    res.status(401).send("you are not admin");
  } else {
    Song.getAll((err, data) => {
      if (err) next(new HttpException(500, "Error retrieving Songs"));
      else res.send(data);
    });
  }
};

exports.getSongInfoById = async (req, res, next) => {
  let songInfo, artistInfo, albumInfo;
  Song.findById(req.params.id, (err, data) => {
    if (err) {
      next(new HttpException(500, "Error retrieving Playlists"));
    } else {
      songInfo = data;
      console.log(songInfo);
      Album.findById(songInfo.albumId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.json({
              ...playlistInfo,
              songs: [],
            });
            return;
          } else {
            next(new HttpException(500, "Error retrieving songs"));
            return;
          }
        } else {
          albumInfo = data;
          ArtistSong.findBySongId(req.params.id, (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.json({
                  ...playlistInfo,
                  songs: [],
                });
                return;
              } else {
                next(new HttpException(500, "Error retrieving songs"));
                return;
              }
            } else {
              artistInfo = data;
            }
          });
        }
      });
    }
  });
  //get song list
  setTimeout(() => {
    

    
  }, 300);

  setTimeout(() => {
    res.json({
      ...songInfo,
      songs: [songInfo],
      artists: artistInfo,
      albums: albumInfo,
    });
  }, 500);
};

exports.getRandomSongs = async (req, res, next) => {
  Song.getRandom(req.params.playlistId, (err, data) => {
    if (err) next(new HttpException(500, "Error retrieving Songs"));
    else res.send(data);
  });
};

exports.updateSongById = async (req, res, next) => {
  Song.updateById(req.params.id, new Song(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "Song not found"));
      } else {
        next(new HttpException(500, "Error updating Song"));
      }
    } else res.send(data);
  });
};

exports.deleteSongById = async (req, res, next) => {
  Song.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        next(new HttpException(404, "Song not found"));
      } else {
        next(new HttpException(500, "Error deleting Song"));
      }
    } else res.send({ message: `Song was deleted successfully!` });
  });
};
