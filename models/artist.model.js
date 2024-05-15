const sql = require("../db/dbConnection");
const fs = require("fs");
// constructor
const Artist = function (artist) {
  this.name = artist.name;
  this.id = artist.id;
  this.coverImgUrl = artist.coverImgUrl;
  this.bgcolor = artist.bgcolor;
  this.description = artist.description;
};

Artist.create = (newArtist, result) => {
  sql.query(
    "INSERT INTO artist (id, name, coverImgUrl, bgColor, description) VALUE (?,?,?,?,?)",
    [newArtist.id, newArtist.name, newArtist.coverImgUrl, newArtist.bgcolor, newArtist.description],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if(!newArtist.id){
        newArtist.id = res.insertId
      }
      fs.rename(`./assets/Artist/tempArtist.jpg`, `./assets/Artist/${newArtist.id}.jpg`, function(err) {
        if ( err ) console.log('ERROR: ' + err);
      });

      console.log("created artist: ", { id: res.insertId, ...newArtist });
      result(null, { id: res.insertId, ...newArtist });
    }
  );
};

Artist.findById = (id, result) => {
  sql.query(`SELECT * FROM artist WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found artist: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Artist with the id
    result({ kind: "not_found" }, null);
  });
};

Artist.findByName = (name, result) => {
  sql.query(`SELECT * FROM artist WHERE name = '${name}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found artist: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Artist with the name
    result({ kind: "not_found" }, null);
  });
};

Artist.findByKeyWord = (key, result) => {
  sql.query(
    `SELECT *
        ,CASE   WHEN name LIKE '${key}%' THEN 1
                WHEN name LIKE '%${key}%' THEN 2
      
    END AS priority
    FROM artist
    WHERE name LIKE '%${key}%'
    ORDER BY priority, name`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found artist: ", res);
        result(null, res);
        return;
      }

      // not found Artist with the name
      result({ kind: "not_found" }, null);
    }
  );
};

Artist.getAll = (result) => {
  let query = "SELECT * FROM artist";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("artist: ", res);
    result(null, res);
  });
};

Artist.updateById = (id, artist, result) => {
  sql.query(
    "UPDATE artist SET name = ?, coverImgUrl = ?, bgcolor = ?, description = ? WHERE id = ?",
    [artist.name, artist.coverImgUrl, artist.bgcolor, artist.description, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        // not found Artist with the id
        result({ kind: "not_found" }, null);
        return;
      }
      fs.rename(`./assets/Artist/tempArtist.jpg`, `./assets/Artist/${artist.id}.jpg`, function(err) {
        if ( err ) console.log('ERROR: ' + err);
      });

      console.log("updated artist: ", { id: id, ...artist });
      result(null, { id: id, ...artist });
    }
  );
};

Artist.remove = (id, result) => {
  sql.query("DELETE FROM artist WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows === 0) {
      // not found Artist with the id
      result({ kind: "not_found" }, null);
      return;
    }
    fs.unlink(`./assets/Artist/${id}.jpg`, (err) => {
      if (err) throw err;
      console.log(`${id}.jpg was deleted`);
    });

    console.log("deleted artist with id: ", id);
    result(null, res);
  });
};

Artist.removeAll = (result) => {
  sql.query("DELETE FROM artist", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} artists`);
    result(null, res);
  });
};

module.exports = Artist;
