const sql = require("../db/dbConnection");

// constructor
const PlaylistSong = function (playlistSong) {
  this.playlistId = playlistSong.playlistId;
  this.songId = playlistSong.songId;
};

PlaylistSong.create = (newPlaylistSong, result) => {
  sql.query("INSERT INTO playlistsong SET ?", newPlaylistSong, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created playlistSong: ", { });
    result(null, {});
  });
};

PlaylistSong.findByIds = (songId, playlistId, result) => {
  sql.query(
    `SELECT * FROM playlistsong WHERE songId = ${songId} AND playlistId = ${playlistId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found playlistSong: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found PlaylistSong with the id
      result({ kind: "not_found" }, null);
    }
  );
};

PlaylistSong.findByPlaylistId = (id, result) => {
  sql.query(
    `SELECT  s.id, s.name, s.audioUrl, s.coverImgUrl, s.albumId, s.bgcolor, s.description, s.duration, s.type, s.createdAt
    FROM song as s
    INNER JOIN playlistsong as PS ON s.id = PS.songId
    WHERE PS.playlistId = ${id};`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found playlistSongs: ", res);
        result(null, res);
        return;
      }

      // not found PlaylistSong with the id
      result({ kind: "not_found" }, null);
    }
  );
};

PlaylistSong.findBySongId = (id, result) => {
  sql.query(`SELECT * FROM playlistsong WHERE songId = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found playlistSongs: ", res);
      result(null, res);
      return;
    }

    // not found PlaylistSong with the id
    result({ kind: "not_found" }, null);
  });
};

PlaylistSong.getAll = (songId, result) => {
  let query = "SELECT * FROM playlistsong";

  if (songId) {
    query += ` WHERE name LIKE '%${songId}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("playlistSongs: ", res);
    result(null, res);
  });
};

PlaylistSong.updateByIds = (songId, playlistId, playlistSong, result) => {
  sql.query(
    "UPDATE playlistsong SET playlistId = ?, songId = ? WHERE songId = ?, playlistId = ?",
    [playlistSong.playlistId, playlistSong.songId, songId, playlistId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        // not found PlaylistSong with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated playlistSong: ", { ...playlistSong });
      result(null, { ...playlistSong });
    }
  );
};

PlaylistSong.remove = (songId, playlistId, result) => {
  sql.query(
    "DELETE FROM playlistsong WHERE songId = ? AND playlistId = ?",
    [songId, playlistId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        // not found PlaylistSong with the id
        result({ kind: "not_found", message: "PlaylistSong not found" }, null);
        return;
      }

      console.log("deleted playlistSong");
      result(null, {message: "delete PlaylistSong successfully" });
    }
  );
};

PlaylistSong.removeAll = (result) => {
  sql.query("DELETE FROM playlistsong", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} playlistSongs`);
    result(null, res);
  });
};

module.exports = PlaylistSong;
