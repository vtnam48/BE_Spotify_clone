const sql = require("../db/dbConnection");


// constructor
const FavoritePlaylist = function (FavoritePlaylist) {
    this.playlistId = FavoritePlaylist.playlistId;
    this.userId = FavoritePlaylist.userId;
    this.createdAt = FavoritePlaylist.createdAt;
}

FavoritePlaylist.create = (newFavoritePlaylist, result) => {
    sql.query("INSERT INTO favoriteplaylist SET ?", newFavoritePlaylist, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created favoritePlaylist: ", {...newFavoritePlaylist});
        result(null, {...newFavoritePlaylist});
    });
}

FavoritePlaylist.getSortedPlaylistsList = (userId, result) => {
    let query =
        `SELECT P.id , P.userId, P.name, P.bgcolor, P.coverImgURl,P.type, P.createdAt
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

FavoritePlaylist.getAll = (result) => {
    let query = "SELECT * FROM favoriteplaylist";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("favoritePlaylist: ", res);
        result(null, res);
    });
}

// FavoritePlaylist.findByIds = (playlistId,userId, result) => {
//     sql.query(`SELECT * FROM favoriteplaylist WHERE playlistId = ${playlistId} AND userId = ${userId}`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }
//
//         if (res.length) {
//             console.log("found favoritePlaylist: ", res[0]);
//             result(null, res[0]);
//             return;
//         }
//
//         // not found FavoritePlaylist with the id
//         result({ kind: "not_found" }, null);
//     });
// }
//
// FavoritePlaylist.findByUserId = (id, result) => {
//     sql.query(`SELECT * FROM favoriteplaylist WHERE userId = ${id}`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }
//
//         if (res.length) {
//             console.log("found favoritePlaylist: ", res);
//             result(null, res);
//             return;
//         }
//
//         // not found FavoritePlaylist with the id
//         result({ kind: "not_found" }, null);
//     });
// }
//
// FavoritePlaylist.findByPlaylistId = (id, result) => {
//     sql.query(`SELECT * FROM favoriteplaylist WHERE playlistId = ${id}`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }
//
//         if (res.length) {
//             console.log("found favoritePlaylist: ", res);
//             result(null, res);
//             return;
//         }
//
//         // not found FavoritePlaylist with the id
//         result({ kind: "not_found" }, null);
//     });
// }

FavoritePlaylist.update = (playlistId, userId, favoritePlaylist, result) => {
    sql.query(
        "UPDATE favoriteplaylist SET userId = ?, playlistId = ? WHERE playlistId = ?, userId = ?",
        [favoritePlaylist.userId, favoritePlaylist.playlistId, playlistId, userId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                // not found FavoritePlaylist with the id
                result({kind: "not_found"}, null);
                return;
            }

            console.log("updated favoritePlaylist: ", {...favoritePlaylist});
            result(null, {...favoritePlaylist});
        }
    );
}

FavoritePlaylist.remove = (playlistId, userId, result) => {
    sql.query("DELETE FROM favoriteplaylist WHERE playlistId = ? AND userId = ?", [playlistId, userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found FavoritePlaylist with the id
            result({kind: "not_found"}, null);
            return;
        }

        console.log(`deleted favoritePlaylist: userId: ${userId}, playlistId: ${playlistId}  `);
        result(null, res);
    });
}

FavoritePlaylist.removeAll = result => {
    sql.query("DELETE FROM favoriteplaylist", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} favoritePlaylist`);
        result(null, res);
    });
}

module.exports = FavoritePlaylist;

