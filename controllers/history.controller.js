const AlbumHistory = require("../models/albumHistory.model.js");
const ArtistHistory = require("../models/artistHistory.model.js");
const PlaylistHistory = require("../models/playlistHistory.model.js");

exports.getHistory = async (req, res, next) => {
  //let userId = req.params.userId;
  let userId = req.user.id;
  let albumHistory = [],
    playlistHistory = [],
    artistHistory = [];
  await Promise.all([
    AlbumHistory.getSortedAlbumsList(userId, (err, res) => {
      if (err) {
        console.log(err);
      } else albumHistory = res;
    }),

    PlaylistHistory.getSortedPlaylistsList(userId, (err, res) => {
      if (err) {
        console.log(err);
      } else playlistHistory = res;
    }),

    ArtistHistory.getSortedArtistsList(userId, (err, res) => {
      if (err) {
        console.log(err);
      } else artistHistory = res;
    }),
  ]);

  /// Sort by time

  setTimeout(() => {
    let list = [...albumHistory, ...playlistHistory, ...artistHistory];
    list.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    res.json(list);
  }, 300);
};

exports.getAllHistory = async (userId, res) => {
  let albumHistory, playlistHistory, artistHistory;
  await Promise.all([
    AlbumHistory.getSortedAlbumsList(userId, (err, res) => {
      if (err) {
        console.log(err);
      } else albumHistory = res;
    }),

    PlaylistHistory.getSortedPlaylistsList(1, (err, res) => {
      if (err) {
        console.log(err);
      } else playlistHistory = res;
    }),

    ArtistHistory.getSortedArtistsList(userId, (err, res) => {
      if (err) {
        console.log(err);
      } else artistHistory = res;
    }),
  ]);
  console.log("LIST");
  /// Sort by time
  let list = [
    ...JSON.parse(albumHistory),
    ...JSON.parse(playlistHistory),
    ...JSON.parse(artistHistory),
  ];
  list.sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  setTimeout(() => {
    res.json(list);
  }, 100);
};

exports.createArtistHistory = async (req, res, next) => {
  let artistHistoryList,
    exist = false,
    //userId = req.body.userId,
    userId = req.user.id,
    artistId = req.body.artistId;

  //check if this artistHistory already exist in db
  ArtistHistory.getAll((err, res) => {
    if (err) {
      console.log(err);
    }
    artistHistoryList = res;

    artistHistoryList.forEach((artistHistory) => {
      if (
        artistHistory.userId === userId &&
        artistHistory.artistId === artistId
      )
        exist = true;
    });
  });

  setTimeout(() => {
    const artistHistory = new ArtistHistory({
      userId: userId,
      artistId: artistId,
      createdAt: new Date(),
    });

    if (exist) {
      ArtistHistory.update(artistId, userId, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while updating the history.",
          });
        else res.send(data);
      });
    } else
      ArtistHistory.create(artistHistory, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the history.",
          });
        else res.send(data);
      });
  }, 200);
};

exports.createAlbumHistory = async (req, res, next) => {
  let albumHistoryList,
    exist = false,
    //userId = req.body.userId,
    userId = req.user.id,
    albumId = req.body.albumId;

  //check if this AlbumHistory already exist in db
  AlbumHistory.getAll((err, res) => {
    if (err) {
      console.log(err);
    }
    albumHistoryList = res;

    albumHistoryList.forEach((albumHistory) => {
      if (albumHistory.userId === userId && albumHistory.albumId === albumId)
        exist = true;
    });
  });

  setTimeout(() => {
    const albumHistory = new AlbumHistory({
      userId: userId,
      albumId: albumId,
    });

    if (exist) {
      AlbumHistory.update(albumId, userId, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while updating the history.",
          });
        else res.send(data);
      });
    } else
      AlbumHistory.create(albumHistory, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the history.",
          });
        else res.send(data);
      });
  }, 200);
};

exports.createPlaylistHistory = async (req, res, next) => {
  let playlistHistoryList,
    exist = false,
    //userId = req.body.userId,
    userId = req.user.id,
    playlistId = req.body.playlistId;

  PlaylistHistory.getAll((err, data) => {
    if (err) {
      console.log(err);
    }
    playlistHistoryList = data;

    playlistHistoryList.forEach((playlistHistory) => {
      if (
        playlistHistory.userId === userId &&
        playlistHistory.playlistId === playlistId
      )
        exist = true;
    });
  });
  //check if this playlistHistory already exist in db

  setTimeout(() => {
    const playlistHistory = new PlaylistHistory({
      userId: userId,
      playlistId: playlistId,
      createdAt: new Date(),
    });

    if (exist) {
      PlaylistHistory.update(playlistId, userId, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while updating the history.",
          });
        else res.send(data);
      });
    } else
      PlaylistHistory.create(playlistHistory, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the history.",
          });
        else res.send(data);
      });
  }, 200);
};

exports.deleteArtistHistory = async (req, res, next) => {
  let //userId = req.body.userId,
    userId = req.user.id,
    artistId = req.body.artistId;

  ArtistHistory.remove(artistId, userId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting the history.",
      });
    else res.send(data);
  });
};
exports.deleteAlbumHistory = async (req, res, next) => {
  let //userId = req.body.userId,
    userId = req.user.id,
    albumId = req.body.albumId;

  AlbumHistory.remove(albumId, userId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting the history.",
      });
    else res.send(data);
  });
};

exports.deletePlaylistHistory = async (req, res, next) => {
  let //userId = req.body.userId,
    userId = req.user.id,
    playlistId = req.body.playlistId;
  PlaylistHistory.remove(playlistId, userId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting the history.",
      });
    else res.send(data);
  });
};

exports.deleteAllHistory = async (req, res, next) => {
  let error = false;
  PlaylistHistory.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting the history.",
      });
      error = true;
    }
  });

  ArtistHistory.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting the history.",
      });
      error = true;
    }
  });

  AlbumHistory.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting the history.",
      });
      error = true;
    }
  });

  setTimeout(() => {
    if (!error) res.send({ message: "all history deleted" });
  }, 300);
};
