const sql = require("../db/dbConnection");
const fs = require("fs");
const api = require("../utils/baseUrl");
// constructor
const Playlist = function (playlist) {
  this.id = playlist.id;
  this.name = playlist.name;
  this.coverImgUrl = playlist.coverImgUrl;
  this.bgcolor = playlist.bgcolor;
  this.createdAt = playlist.createdAt;
  this.userId = playlist.userId;
};

Playlist.create = (newPlaylist, result) => {
  sql.query("INSERT INTO playlist SET ?", newPlaylist, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    fs.copyFile(
      "./assets/Playlist/myPlaylist.jpg",
      `./assets/Playlist/${res.insertId}.jpg`,
      (err) => {
        if (err) throw err;
        console.log(`${res.insertId}.jpg was copied to destination.txt`);
      }
    );

    sql.query(`UPDATE playlist SET coverImgUrl = ? WHERE id = ?`, [
      `${api.BASE_URL}/assets/Playlist/${res.insertId}.jpg`,
      res.insertId,
    ]);

    console.log("created playlist: ", { id: res.insertId, ...newPlaylist });
    result(null, { id: res.insertId, ...newPlaylist });
  });
};

Playlist.createServerPlaylist = (newPlaylist, result) => {
  sql.query(
    "INSERT INTO playlist (id, name, coverImgUrl, bgColor, userId) VALUE (?,?,?,?,?)",
    [newPlaylist.id, newPlaylist.name, newPlaylist.coverImgUrl, newPlaylist.bgcolor, newPlaylist.userId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      fs.rename(
        "./assets/Playlist/tempPlaylist.jpg",
        `./assets/Playlist/${res.insertId}.jpg`,
        (err) => {
          if (err) throw err;
        }
      );

      
      result(null, { id: res.insertId});
    }
  );
};

Playlist.findById = (id, result) => {
  sql.query(`SELECT * FROM playlist WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found playlist: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Playlist with the id
    result({ kind: "not_found" }, null);
  });
};

Playlist.findByName = (name, result) => {
  sql.query(`SELECT * FROM playlist WHERE name = '${name}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found playlist: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Playlist with the name
    result({ kind: "not_found" }, null);
  });
};

Playlist.findByKeyWord = (key, result) => {
  sql.query(
    `SELECT *
        ,CASE   WHEN name LIKE '${key}%' THEN 1
                WHEN name LIKE '%${key}%' THEN 2
      
    END AS priority
    FROM playlist
    WHERE name LIKE '%${key}%' AND userId = 1
    ORDER BY priority, name`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found playlist: ", res);
        result(null, res);
        return;
      }

      // not found Playlist with the name
      result({ kind: "not_found" }, null);
    }
  );
};

Playlist.findByUserId = (userId, result) => {
  let query = `SELECT * FROM playlist WHERE userId = ${userId}`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("playlist: ", res);
    result(null, res);
  });
};

Playlist.getAll = (result) => {
  let query = "SELECT * FROM playlist";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("playlists: ", res);
    result(null, res);
  });
};

Playlist.addSong = (playlistId, songId, result) => {};

Playlist.updateById = (id, playlist, result) => {
  sql.query(
    "UPDATE playlist SET name = ?, coverImgUrl = ?, bgcolor = ?, description = ?, createdAt = ?, userId = ? WHERE id = ?",
    [
      playlist.name,
      playlist.coverImgUrl,
      playlist.bgcolor,
      playlist.description,
      playlist.createdAt,
      playlist.userId,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        // not found Playlist with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated playlist: ", { id: id, ...playlist });
      result(null, { id: id, ...playlist });
    }
  );
};

Playlist.updateName = (id, name, file, result) => {
  if (file) {
    sql.query(
      "UPDATE playlist SET name = ?, coverImgUrl = ? WHERE id = ?",
      [name, `${api.BASE_URL}/assets/Playlist/${id}.jpg`, id],
      (err, res) => {
        if (err) {
          //console.log("error: ", err);
          result(err, null);
          return;
        }

        if (res.affectedRows === 0) {
          // not found Playlist with the id
          result({ kind: "not_found" }, null);
          return;
        }

        fs.rename(
          "./assets/Playlist/tempPlaylist.jpg",
          `./assets/Playlist/${id}.jpg`,
          (err) => {
            if (err) throw err;
          }
        );
        console.log("updated playlist: ", { id: id });
        result(null, "playlist update successfully");
      }
    );
  }
  else{
    sql.query(
        "UPDATE playlist SET name = ? WHERE id = ?",
        [name, id],
        (err, res) => {
          if (err) {
            //console.log("error: ", err);
            result(err, null);
            return;
          }
  
          if (res.affectedRows === 0) {
            // not found Playlist with the id
            result({ kind: "not_found" }, null);
            return;
          }

          console.log("no file")
          console.log("updated playlist: ", { id: id });
          result(null, "playlist update successfully");
        }
      );
  }
};

Playlist.remove = (id, result) => {
  sql.query("DELETE FROM playlist WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows === 0) {
      // not found Playlist with the id
      result({ kind: "not_found" }, null);
      return;
    }
    fs.unlink(`./assets/Playlist/${id}.jpg`, (err) => {
      if (err) throw err;
      console.log(`${id}.jpg was deleted`);
    });

    console.log("deleted playlist with id: ", id);
    result(null, res);
  });
};

Playlist.removeAll = (result) => {
  sql.query("DELETE FROM playlist", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} playlists`);
    result(null, res);
  });
};

module.exports = Playlist;
