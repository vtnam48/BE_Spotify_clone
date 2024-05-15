const sql = require("../db/dbConnection");

// constructor
const SongGenre = function (SongGenre) {
  this.genreId = SongGenre.genreId;
  this.songId = SongGenre.songId;
};

SongGenre.create = (newSongGenre, result) => {
  sql.query("INSERT INTO songgenre SET ?", newSongGenre, (err, res) => {
    if (err) {
      if (err.message.includes("FOREIGN KEY (`genreId`)"))
        err.message = "this genre does not exist";
      result(err, null);
      return;
    }

    console.log("created songGenre: ", { ...newSongGenre });
    result(null, { ...newSongGenre });
  });
};

SongGenre.findByIds = (songId, genreId, result) => {
  sql.query(
    `SELECT * FROM songgenre WHERE songId = ${songId} AND genreId = ${genreId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found songGenre: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found SongGenre with the id
      result({ kind: "not_found" }, null);
    }
  );
};

SongGenre.findByGenreId = (id, result) => {
  sql.query(
    `SELECT *
    FROM song
    INNER JOIN songgenre as SG on song.Id = SG.songId
    WHERE genreId = ${id}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found songGenres: ", res);
        result(null, res);
        return;
      }

      // not found SongGenre with the id
      result({ kind: "not_found" }, null);
    }
  );
};

SongGenre.findBySongId = (id, result) => {
  sql.query(`SELECT * FROM songgenre WHERE songId = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found songGenres: ", res);
      result(null, res);
      return;
    }

    // not found SongGenre with the id
    result({ kind: "not_found" }, null);
  });
};

SongGenre.getAll = (songId, result) => {
  let query = "SELECT * FROM songgenre";

  if (songId) {
    query += ` WHERE name LIKE '%${songId}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("songGenres: ", res);
    result(null, res);
  });
};

SongGenre.updateByIds = (songId, genreId, songGenre, result) => {
  sql.query(
    "UPDATE songgenre SET genreId = ?, songId = ? WHERE songId = ?, genreId = ?",
    [songGenre.genreId, songGenre.songId, songId, genreId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        // not found SongGenre with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated songGenre: ", { ...songGenre });
      result(null, { ...songGenre });
    }
  );
};
SongGenre.updateBySongId = (songId, genreId, result) => {
  sql.query(
    "UPDATE songgenre SET genreId = ? WHERE songId = ?",
    [genreId, songId],
    (err, res) => {
      if (err) {
        if (err.message.includes("FOREIGN KEY (`genreId`)"))
          err.message = "this genre does not exist";
        result(err, null);
        return;
      }
      if (res.affectedRows === 0) {
        // not found SongGenre with the id
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, "data");
    }
  );
};

SongGenre.remove = (songId, genreId, result) => {
  sql.query(
    "DELETE FROM songgenre WHERE songId = ?, genreId = ?",
    [songId, genreId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        // not found SongGenre with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted songGenre with id: ", id);
      result(null, res);
    }
  );
};

SongGenre.removeAll = (result) => {
  sql.query("DELETE FROM songgenre", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} songGenres`);
    result(null, res);
  });
};

module.exports = SongGenre;
