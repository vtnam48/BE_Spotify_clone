const Album = require("../models/album.model.js");
const Artist = require("../models/artist.model.js");
const Playlist = require("../models/playlist.model.js");
const Song = require("../models/song.model.js");

exports.getSearchResult = async (req, res, next) => {
  keyword = req.params.keyword;
  let album, playlist, artist, song;
  Promise.all([
    Album.findByKeyWord(keyword, (err, res) => {
      if (err) {
        console.log(err);
      } else album = res;
    }),

    Playlist.findByKeyWord(keyword, (err, res) => {
      if (err) {
        console.log(err);
      } else playlist = res;
    }),

    Artist.findByKeyWord(keyword, (err, res) => {
      if (err) {
        console.log(err);
      } else artist = res;
    }),
    Song.findByKeyWord(keyword, (err, res) => {
      if (err) {
        console.log(err);
      } else song = res;
    }),
  ]);

  setTimeout(() => {
    res.json({
      songs: song,
      albums: album,
      playlists: playlist,
      artists: artist,
    });
  }, 300);
};

exports.searchForSongOnly = async (req, res, next) => {
  keyword = req.params.keyword;
  playlistId = req.params.playlistId;
  let song;

  Song.getSongOutsideOfPlaylist(keyword, playlistId, (err, res) => {
    if (err) {
      console.log(err);
    } else song = res;
  })

  setTimeout(() => {
    res.json({
      songs: song,
    });
  }, 300);
};
