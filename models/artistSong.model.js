const sql = require("../db/dbConnection");

// constructor
const ArtistSong = function (ArtistSong) {
  this.artistId = ArtistSong.artistId;
  this.songId = ArtistSong.songId;
};

ArtistSong.create = (newArtistSong, result) => {
  sql.query("INSERT INTO artistsong SET ?", newArtistSong, (err, res) => {
    if (err) {
      if (err.message.includes("FOREIGN KEY (`artistId`)"))
        err.message = "this artistId does not exist";
      result(err, null);
      return;
    }

    console.log("created artistSong: ", { ...newArtistSong });
    result(null, { ...newArtistSong });
  });
};

ArtistSong.findByIds = (songId, artistId, result) => {
  sql.query(
    `SELECT * FROM artistsong WHERE songId = ${songId} AND artistId = ${artistId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found artistSong: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found ArtistSong with the id
      result({ kind: "not_found" }, null);
    }
  );
};

ArtistSong.findByArtistId = (id, result) => {
  sql.query(
    `SELECT  s.id, s.name, s.audioUrl, s.coverImgUrl, s.albumId, s.bgcolor, s.description, s.duration, s.type, s.createdAt, ATS.artistId
        FROM song as s
        INNER JOIN artistsong as ATS  ON s.id = ATS.songId
        WHERE ATS.artistId = ${id};`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found artistSongs: ", res);
        result(null, res);
        return;
      }

      // not found PlaylistSong with the id
      result({ kind: "not_found" }, null);
    }
  );
};

ArtistSong.findBySongId = (id, result) => {
  sql.query(
    `SELECT A.id, A.name, A.coverImgUrl, A.bgcolor, A.description , A.type
    FROM artist as A
    INNER JOIN artistsong as ATS ON A.id = ATS.artistId
    WHERE ATS.songId = ${id}
    `,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found artistSongs: ", res);
        result(null, res);
        return;
      }

      // not found ArtistSong with the id
      result({ kind: "not_found" }, null);
    }
  );
};

ArtistSong.getAll = (songId, result) => {
  let query = "SELECT * FROM artistsong";

  if (songId) {
    query += ` WHERE name LIKE '%${songId}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("artistSongs: ", res);
    result(null, res);
  });
};

ArtistSong.updateByIds = (songId, artistId, artistSong, result) => {
  sql.query(
    "UPDATE artistsong SET artistId = ?, songId = ? WHERE songId = ?, artistId = ?",
    [artistSong.artistId, artistSong.songId, songId, artistId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        // not found ArtistSong with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated artistSong: ", { ...artistSong });
      result(null, { ...artistSong });
    }
  );
};
ArtistSong.updateBySongId = (songId, artistId, result) => {
  sql.query(
    "UPDATE artistsong SET artistId = ? WHERE songId = ?",
    [artistId, songId],
    (err, res) => {
      if (err) {
        if (err.message.includes("FOREIGN KEY (`artistId`)"))
          err.message = "this artistId does not exist";
        result(err, null);
        return;
      }

      if (res.affectedRows === 0) {
        // not found ArtistSong with the id
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, "data");
    }
  );
};

ArtistSong.remove = (songId, artistId, result) => {
  sql.query(
    "DELETE FROM artistsong WHERE songId = ? AND artistId = ?",
    [songId, artistId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        // not found ArtistSong with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted artistSong with id: ", songId);
      result(null, res);
    }
  );
};

ArtistSong.removeAll = (result) => {
  sql.query("DELETE FROM artistsong", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} artistSongs`);
    result(null, res);
  });
};

module.exports = ArtistSong;
