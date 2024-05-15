const sql = require("../db/dbConnection");
const fs = require("fs");
const Song = require("./song.model");

// constructor
const Album = function (album) {
  this.id = album.id
  this.name = album.name;
  this.coverImgUrl = album.coverImgUrl;
  this.bgcolor = album.bgcolor;
  this.description = album.description;
  this.artistId = album.artistId;
  this.createdAt = album.createdAt;
};

Album.create = (newAlbum, result) => {
  sql.query(
    "INSERT INTO album (id, name, artistId, coverImgUrl, bgColor, description) VALUE (?,?,?,?,?,?)",
    [newAlbum.id, newAlbum.name, newAlbum.artistId, newAlbum.coverImgUrl, newAlbum.bgcolor, newAlbum.description],
    (err, res) => {
      if (err) {
        if(err.message.includes("FOREIGN KEY (`artistId`)")) err.message = "this artistId does not exist"
        result(err, null);
        return;
      }
      if(!newAlbum.id){
        newAlbum.id = res.insertId
      }
      fs.rename(`./assets/Album/tempAlbum.jpg`, `./assets/Album/${newAlbum.id}.jpg`, function(err) {
        if ( err ) console.log('ERROR: ' + err);
      });
      console.log("created album: ", { id: res.insertId, ...newAlbum });
      result(null, { id: res.insertId, ...newAlbum });
    }
  );
};

Album.findById = (id, result) => {
  sql.query(`SELECT * FROM album WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found album: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Album with the id
    result({ kind: "not_found" }, null);
  });
};

Album.findByName = (name, result) => {
  sql.query(`SELECT * FROM album WHERE name = '${name}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found album: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Album with the name
    result({ kind: "not_found" }, null);
  });
};

Album.findByKeyWord = (key, result) => {
  sql.query(
    `SELECT *
        ,CASE   WHEN name LIKE '${key}%' THEN 1
                WHEN name LIKE '%${key}%' THEN 2
          
        END AS priority
    FROM album
    WHERE name LIKE '%${key}%'
    ORDER BY priority, name`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found album: ", res);
        result(null, res);
        return;
      }

      // not found Album with the name
      result({ kind: "not_found" }, null);
    }
  );
};

Album.getAll = (result) => {
  let query = "SELECT * FROM album";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("album: ", res);
    result(null, res);
    console.log(res);
  });
};

Album.updateById = (id, album, result) => {
  sql.query(
    "UPDATE album SET name = ?, coverImgUrl = ?, bgcolor = ?, description = ?, artistId = ? WHERE id = ?",
    [
      album.name,
      album.coverImgUrl,
      album.bgcolor,
      album.description,
      album.artistId,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        // not found Album with the id
        result({ kind: "not_found" }, null);
        return;
      }

      fs.rename(`./assets/Album/tempAlbum.jpg`, `./assets/Album/${album.id}.jpg`, function(err) {
        if ( err ) console.log('ERROR: ' + err);
      });
      console.log("updated album: ", { id: id, ...album });
      result(null, { id: id, ...album });
    }
  );
};

Album.remove = (id, result) => {
  sql.query("DELETE FROM album WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows === 0) {
      // not found Album with the id
      result({ kind: "not_found" }, null);
      return;
    }
    fs.unlink(`./assets/Album/${id}.jpg`, (err) => {
      if (err) throw err;
      console.log(`${id}.jpg was deleted`);
    });
    console.log("deleted album with id: ", id);
    result(null, res);
  });
};

Album.removeAll = (result) => {
  sql.query("DELETE FROM album", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} albums`);
    result(null, res);
  });
};

Album.removeAssetsByArtistId = (id, result) => {
  sql.query("SELECT * FROM album WHERE artistId = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows === 0) {
      // not found Album with the id
      result({ kind: "not_found" }, null);
      return;
    }
    res.forEach((album) => {
      fs.unlink(`./assets/Album/${album.id}.jpg`, (err) => {
        if (err) throw err;
        console.log(`${id}.jpg was deleted`);
      });
      Song.removeAssetsByAlbumId(album.id);
    });

    console.log("deleted album with id: ", id);
  });
};
module.exports = Album;
