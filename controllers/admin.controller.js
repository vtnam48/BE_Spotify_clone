const Song = require("../models/song.model.js");
const Album = require("../models/album.model.js");
const Artist = require("../models/artist.model.js");
const User = require("../models/user.model");
const Playlist = require("../models/playlist.model");
const HttpException = require("../utils/HttpException");
var path = require("path");

exports.deleteUsers = async (req, res) => {
  var error = null;
  if (req.user.type !== "admin") {
    res.status(401).send("you are not admin");
  } else {
    var users = req.body.users;
    users.forEach((user) => {
      if (user === req.user.id) {
        error = "You cannot delete yourself";
        return;
      }
      if (user === 1) {
        error = "You cannot delete server";
        return;
      }
      User.remove(user, (err, data) => {
        if (err) {
          error = err;
        }
      });
    });
    setTimeout(() => {
      if (!error) res.status(200).send("Users has been deleted");
      else res.status(500).send(error);
    }, 300);
  }
};

exports.deleteSongs = async (req, res) => {
  var error = null;
  if (req.user.type != "admin") {
    res.status(401).send("you are not admin");
  } else {
    var songs = req.body.songs;
    songs.forEach((song) => {
      Song.remove(song, (err, data) => {
        if (err) {
          error = err;
        }
      });
    });
    setTimeout(() => {
      if (!error) res.status(200).send("Songs has been deleted");
      else res.status(500).send(error);
    }, 300);
  }
};

exports.deleteAlbums = async (req, res) => {
  var error = null;
  if (req.user.type != "admin") {
    res.status(401).send("you are not admin");
  } else {
    var albums = req.body.albums;
    albums.forEach((album) => {
      Song.removeAssetsByAlbumId(album);
      Album.remove(album, (err, data) => {
        if (err) {
          error = err;
        }
      });
    });
    setTimeout(() => {
      if (!error) res.status(200).send("albums has been deleted");
      else res.status(500).send(error);
    }, 300);
  }
};

exports.deleteArtists = async (req, res) => {
  var error = null;
  if (req.user.type != "admin") {
    res.status(401).send("you are not admin");
  } else {
    var artists = req.body.artists;
    artists.forEach((artist) => {
      Album.removeAssetsByArtistId(artist);
      Artist.remove(artist, (err, data) => {
        if (err) {
          error = err;
        }
      });
    });
    setTimeout(() => {
      if (!error) res.status(200).send("artists has been deleted");
      else res.status(500).send(error);
    }, 300);
  }
};

exports.deletePlaylists = async (req, res) => {
  var error = null;
  if (req.user.type != "admin") {
    res.status(401).send("you are not admin");
  } else {
    var playlists = req.body.playlists;
    playlists.forEach((playlist) => {
      Playlist.remove(playlist, (err, data) => {
        if (err) {
          error = err;
        }
      });
    });
    setTimeout(() => {
      if (!error) res.status(200).send("playlists has been deleted");
      else res.status(500).send(error);
    }, 300);
  }
};

exports.refreshSongUrl = async (req, res) => {
  var error = false;
  if (req.user.type != "admin") {
    res.status(401).send("you are not admin");
    return;
  }
  Song.getAll((err, songs) => {
    songs.forEach((song) => {
      Song.updateUrl(song.id, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("something went wrong");
          error = true;
        }
      });
    });
    setTimeout(() => {
      if (!error) {
        res.status(200).send("url updated successfully");
      }
    }, 500);
  });
};
