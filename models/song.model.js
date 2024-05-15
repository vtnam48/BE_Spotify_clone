const sql = require("../db/dbConnection");
const fs = require("fs");
// const dotenv = require("dotenv");
// dotenv.config();
// var Minio = require("minio");

// var minioClient = new Minio.Client({
//   endPoint: "165.22.107.4",
//   port: 9000,
//   useSSL: false,
//   accessKey: process.env.MINIO_ACCESS_KEY,
//   secretKey: process.env.MINIO_SECRET_KEY,
// });

// var metaData = {
//   "Content-Type": "application/octet-stream",
//   "X-Amz-Meta-Testing": 1234,
//   example: 5678,
// };

// constructor
const Song = function (song) {
  this.id = song.id;
  this.name = song.name;
  this.audioUrl = song.audioUrl;
  this.coverImgUrl = song.coverImgUrl;
  this.albumId = song.albumId;
  this.bgcolor = song.bgcolor;
  this.description = song.description;
  this.duration = song.duration;
  this.type = song.type;
  this.createdAt = song.createdAt;
};

Song.create = (newSong, result) => {
  sql.query(
    `INSERT INTO song (id, name, audioUrl, coverImgUrl, albumId, bgcolor, description, duration)
      VALUE (?,?,?,?,?,?,?,?)`,
    [
      newSong.id,
      newSong.name,
      newSong.audioUrl,
      newSong.coverImgUrl,
      newSong.albumId,
      newSong.bgcolor,
      newSong.description,
      newSong.duration,
    ],
    (err, res) => {
      if (err) {
        if(err.message.includes("FOREIGN KEY (`albumId`)")) err.message = "this albumId does not exist"
        result(err, null);
        
        return;
      }
      if(!newSong.id){
        newSong.id = res.insertId
      }
      fs.rename(`./assets/SONG/audio/tempAudio.mp3`, `./assets/SONG/audio/${newSong.id}.mp3`, function(err) {
        if ( err ) console.log('ERROR: ' + err);
      });
      fs.rename(`./assets/SONG/image/tempImage.jpg`, `./assets/SONG/image/${newSong.id}.jpg`, function(err) {
        if ( err ) console.log('ERROR: ' + err);
      });
      // fs.rename(
      //   `./assets/Song/image/tempImage.jpg`,
      //   `./assets/Song/image/${newSong.id}.jpg`,
      //   function (err) {
      //     if (err) console.log("ERROR: " + err);
      //   }
      // );

      // file = "./assets/Song/audio/tempAudio.mp3";
      // minioClient.fPutObject(
      //   process.env.MINIO_SONG_BUCKET,
      //   `${res.insertId}.mp3`,
      //   file,
      //   metaData,
      //   function (err, etag) {
      //     if (err) return console.log(err);
      //     Song.updateUrl(res.insertId, (err, res) => {
      //       if (err) console.log(err)
      //     });
      //   }
      // );
      console.log("created song: ", { id: res.insertId, ...newSong });
      result(null, { id: res.insertId, ...newSong });
    }
  );
};

Song.findById = (id, result) => {
  sql.query(`SELECT * FROM song WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found song: ", res[0].id);

      result(err, res[0]);
      return;
    }

    // not found Song with the id
    result({ kind: "not_found" }, null);
  });
};

Song.findByAlbumId = (id, result) => {
  sql.query(`SELECT * FROM song WHERE albumId = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found song: ", res);
      result(null, res);
      return;
    }

    // not found Song with the id
    result({ kind: "not_found" }, null);
  });
};

Song.findByKeyWord = (key, result) => {
  sql.query(
    `SELECT *
        ,CASE   WHEN name LIKE '${key}%' THEN 1
                WHEN name LIKE '%${key}%' THEN 2
      
    END AS priority
    FROM song
    WHERE name LIKE '%${key}%'
    ORDER BY priority, name`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found song: ", res);
        result(null, res);
        return;
      }

      // not found Song with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Song.getSongOutsideOfPlaylist = (key, playlistId, result) => {
  sql.query(
    `SELECT *
          ,CASE   WHEN name LIKE '${key}%' THEN 1
                  WHEN name LIKE '%${key}%' THEN 2
        
      END AS priority
      FROM song
        WHERE name LIKE '%${key}%' AND id NOT IN (SELECT songId FROM playlistsong WHERE playlistId = ${playlistId})
      ORDER BY priority, name`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found song: ", res);
        result(null, res);
        return;
      }

      // not found Song with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Song.getAll = (result) => {
  sql.query("SELECT * FROM song", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("songs: ", res);
    result(null, res);
  });
};

Song.getRandom = (playlistId, result) => {
  limit = randomIntFromInterval(5, 10);
  sql.query(
    `SELECT * FROM song 
        WHERE id NOT IN (SELECT songId FROM playlistsong WHERE playlistId = ${playlistId})
         ORDER BY RAND() LIMIT ${limit}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("songs: ", res);
      result(null, res);
    }
  );
};
Song.updateById = (id, song, result) => {
  file = "./assets/Song/audio/tempAudio.mp3";
  minioClient.fPutObject(
    process.env.MINIO_SONG_BUCKET,
    `${id}.mp3`,
    file,
    metaData,
    function (err, etag) {
      minioClient.presignedUrl(
        "GET",
        process.env.MINIO_SONG_BUCKET,
        `${id}.mp3`,
        60 * 60 * 24 * 7,
        function (err, presignedUrl) {
          if (err) console.log(err);

          console.log(presignedUrl);
          song.audioUrl = presignedUrl;
          sql.query(
            "UPDATE song SET name = ?, audioUrl = ?, coverImgUrl = ?, albumId = ?, bgcolor = ?, description = ?, duration = ? WHERE id = ?",
            [
              song.name,
              song.audioUrl,
              song.coverImgUrl,
              song.albumId,
              song.bgcolor,
              song.description,
              song.duration,
              id,
            ],
            (err, res) => {
              if (err) {
                if(err.message.includes("FOREIGN KEY (`albumId`)")) err.message = "this albumId does not exist"
                result(err, null);
                return;
              }

              if (res.affectedRows === 0) {
                // not found Song with the id
                result({ kind: "not_found" }, null);
                return;
              }

              fs.rename(
                `./assets/Song/image/tempImage.jpg`,
                `./assets/Song/image/${song.id}.jpg`,
                function (err) {
                  if (err) console.log("ERROR: " + err);
                }
              );
              console.log("updated song: ", { id: id, ...song });
              result(null, { id: id, ...song });
            }
          );
        }
      );
    }
  );
};
Song.updateUrl = (id, result) => {
  var audioUrl;
  minioClient.presignedUrl(
    "GET",
    process.env.MINIO_SONG_BUCKET,
    `${id}.mp3`,
    60 * 60 * 24 * 7,
    function (err, presignedUrl) {
      if (err) console.log(err);

      audioUrl = presignedUrl;
      sql.query(
        "UPDATE song SET audioUrl=? WHERE id = ?",
        [audioUrl, id],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }

          if (res.affectedRows === 0) {
            // not found Song with the id
            result({ kind: "not_found" }, null);
            return;
          }
        }
      );

      result(null, "success");
    }
  );
};

Song.remove = (id, result) => {
  sql.query("DELETE FROM song WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows === 0) {
      // not found Song with the id
      result({ kind: "not_found" }, null);
      return;
    }
    minioClient.removeObject(
      process.env.MINIO_SONG_BUCKET,
      `${id}.mp3`,
      function (err, etag) {
        if (err) return console.log(err);
        console.log("File deleted successfully.");
      }
    );
    fs.unlink(`./assets/Song/image/${id}.jpg`, (err) => {
      if (err) throw err;
      console.log(`${id}.jpg was deleted`);
    });

    console.log("deleted song with id: ", id);
    result(null, res);
  });
};

Song.removeAll = (result) => {
  sql.query("DELETE FROM song", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} songs`);
    result(null, res);
  });
};

Song.removeAssetsByAlbumId = (id, result) => {
  sql.query("SELECT * FROM song WHERE albumId = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows === 0) {
      // not found Song with the id
      result({ kind: "not_found" }, null);
      return;
    }

    res.forEach((song) => {
      fs.unlink(`./assets/Song/image/${song.id}.jpg`, (err) => {
        if (err) throw err;
        console.log(`${song.id}.jpg was deleted`);
      });
    });

    console.log("deleted song with id: ", id);
  });
};
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = Song;
