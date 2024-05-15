const sql = require("../db/dbConnection");
const FavoriteSong = require("./favoriteSong.model");
const FavoriteAlbum = require("./favoriteAlbum.model");
const FavoriteArtist = require("./favoriteArtist.model");
const FavoritePlaylist = require("./favoritePlaylist.model");
const fs = require('fs');
const User = function (user) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.name = user.name;
    this.coverImgUrl = user.coverImgUrl;
    this.createdAt = user.createdAt;
}

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            if(err.message.includes("Duplicate entry")) err.message = "username already existed"
            result(err, null);
            return;
        }

        fs.copyFile('./assets/User/avatarDefault.jpg', `./assets/User/${res.insertId}.jpg`, (err) => {
            if (err) throw err;
            console.log(`${res.insertId}.jpg was created`);
          });

        sql.query(`UPDATE users SET coverImgUrl = ? WHERE id = ?`, [`${res.insertId}.jpg`,res.insertId])
        console.log("created user: ", {id: res.insertId, ...newUser});
        result(null, {id: res.insertId, ...newUser});
    });
}

User.findById = (id, result) => {
    sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            //console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the id
        result({kind: "not_found"}, null);
    });
}

User.findByUsername = async (username, result) => {
    sql.query(`SELECT * FROM users WHERE username = ?`,[username], (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }

        if (res.length) {
            //console.log("found user: ", res[0]);
            result(null, res[0]);
            return
        }

        // not found User with the id
        result({kind: "not_found"}, null);
        

    });

}


User.getSortedPlaylistsList = (userId, result) => {
    let query =
        `SELECT P.id , P.userId, P.name, P.bgcolor, P.coverImgUrl,P.type, P.createdAt
    FROM favoriteplaylist  FP
    INNER JOIN playlist  P ON FP.playlistId = P.Id
    WHERE FP.userId = ${userId} ORDER BY FP.createdAt DESC`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // console.log("favoritePlaylist: ", res);
        result(null, res);
    });
};

User.getSortedAlbumsList = (userId, result) => {
    let query =
        `SELECT A.id, A.name, A.artistId, A.coverImgUrl, A.bgcolor, A.description, A.type , A.createdAt
  FROM favoritealbum as FA
  INNER JOIN album as A ON FA.albumId = A.Id
  WHERE FA.userId = ${userId} ORDER BY FA.createdAt DESC`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // console.log("favoriteAlbum: ", res);
        result(null, res);
    });
};

User.getSortedArtistsList = (userId, result) => {
    let query =
        `SELECT A.id, A.name, A.coverImgUrl, A.bgcolor, A.description, A.type 
  FROM favoriteartist as FA
  INNER JOIN artist as A ON FA.artistId = A.Id
  WHERE userId = ${userId} ORDER BY FA.createdAt DESC`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // console.log("favoriteArtist: ", res);
        result(null, res);
    });
};

User.getSortedSongsList = (userId, result) => {
    let query =
        `SELECT S.id, S.name, S.audioUrl, S.albumId, S.coverImgUrl, S.bgcolor, S.description, S.duration, S.type , S.createdAt
  FROM favoritesong as FS
  INNER JOIN song as S ON FS.songId = S.Id
  WHERE FS.userId = ${userId} ORDER BY FS.createdAt DESC`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // console.log("favoriteSong: ", res);
        result(null, res);
    });
};


User.getAll = (result) => {
    sql.query("SELECT * FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
}

User.updateById = (id, user, result) => {
    
    sql.query(
        "UPDATE users SET name = ? WHERE id = ?",
        [user.name, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                // not found User with the id
                result({kind: "not_found"}, null);
                return;
            }

            console.log("updated user: ", {id: id, ...user});
            result(null, {id: id, ...user});
        }
    );
}

User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found User with the id
            result({kind: "not_found"}, null);
            return;
        }
        fs.unlink(`./assets/User/${id}.jpg`, (err) => {
            if (err) throw err;
            console.log(`${id}.jpg was deleted`);
        });
        console.log("deleted user with id: ", id);
        result(null, res);
    });
}

User.removeAll = result => {
    sql.query("DELETE FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} users`);
        result(null, res);
    });
}

module.exports = User;
