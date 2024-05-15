const sql = require("../db/dbConnection");


// constructor
const FavoriteSong = function (FavoriteSong) {
    this.songId = FavoriteSong.songId;
    this.userId = FavoriteSong.userId;
    this.createdAt = FavoriteSong.createdAt;
}

FavoriteSong.create = (newFavoriteSong, result) => {
    sql.query("INSERT INTO favoritesong SET ?", newFavoriteSong, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created favoriteSong: ", { ...newFavoriteSong });
        result(null, { ...newFavoriteSong });
    });
}

FavoriteSong.getSortedSongsList = (userId, result) => {
    let query =
        `SELECT S.id, S.name, S.audioUrl, S.albumId, S.coverImgUrl, S.bgcolor, S.description, S.type , S.createdAt
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

FavoriteSong.getAll = (result) => {
    let query = "SELECT * FROM favoritesong";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("favoriteSong: ", res);
        result(null, res);
    });
}

// FavoriteSong.findByIds = (songId,userId, result) => {
//     sql.query(`SELECT * FROM favoritesong WHERE songId = ${songId} AND userId = ${userId}`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }
//
//         if (res.length) {
//             console.log("found favoriteSong: ", res[0]);
//             result(null, res[0]);
//             return;
//         }
//
//         // not found FavoriteSong with the id
//         result({ kind: "not_found" }, null);
//     });
// }
//
// FavoriteSong.findByUserId = (id, result) => {
//     sql.query(`SELECT * FROM favoritesong WHERE userId = ${id}`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }
//
//         if (res.length) {
//             console.log("found favoriteSong: ", res);
//             result(null, res);
//             return;
//         }
//
//         // not found FavoriteSong with the id
//         result({ kind: "not_found" }, null);
//     });
// }
//
// FavoriteSong.findBySongId = (id, result) => {
//     sql.query(`SELECT * FROM favoritesong WHERE songId = ${id}`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }
//
//         if (res.length) {
//             console.log("found favoriteSong: ", res);
//             result(null, res);
//             return;
//         }
//
//         // not found FavoriteSong with the id
//         result({ kind: "not_found" }, null);
//     });
// }



FavoriteSong.update = (songId, userId, favoriteSong, result) => {
    sql.query(
        "UPDATE favoritesong SET userId = ?, songId = ? WHERE songId = ?, userId = ?",
        [favoriteSong.userId, favoriteSong.songId, songId, userId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                // not found FavoriteSong with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated favoriteSong: ", { ...favoriteSong });
            result(null, { ...favoriteSong });
        }
    );
}

FavoriteSong.remove = (userId, songId, result) => {
    sql.query("DELETE FROM favoritesong WHERE songId = ? AND userId = ?", [songId,userId], (err, res) => {
            if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found FavoriteSong with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log(`deleted favoriteSong: userId: ${userId}, songId: ${songId}  `);
        result(null, res);
    });
}

FavoriteSong.removeAll = result => {
    sql.query("DELETE FROM favoritesong", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} favoriteSong`);
        result(null, res);
    });
}

module.exports = FavoriteSong;

