const sql = require("../db/dbConnection");


// constructor
const FavoriteArtist = function (FavoriteArtist) {
    this.artistId = FavoriteArtist.artistId;
    this.userId = FavoriteArtist.userId;
    this.createdAt = FavoriteArtist.createdAt;
}

FavoriteArtist.create = (newFavoriteArtist, result) => {
    sql.query("INSERT INTO favoriteartist SET ?", newFavoriteArtist, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created favoriteArtist: ", { ...newFavoriteArtist });
        result(null, { ...newFavoriteArtist });
    });
}

FavoriteArtist.getSortedArtistsList = (userId, result) => {
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

FavoriteArtist.getAll = (result) => {
    let query = "SELECT * FROM favoriteartist";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("favoriteArtist: ", res);
        result(null, res);
    });
}

// FavoriteArtist.findByIds = (artistId,userId, result) => {
//     sql.query(`SELECT * FROM favoriteartist WHERE artistId = ${artistId} AND userId = ${userId}`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }
//
//         if (res.length) {
//             console.log("found favoriteArtist: ", res[0]);
//             result(null, res[0]);
//             return;
//         }
//
//         // not found FavoriteArtist with the id
//         result({ kind: "not_found" }, null);
//     });
// }

// FavoriteArtist.findByUserId = (id, result) => {
//     sql.query(`SELECT * FROM favoriteartist WHERE userId = ${id}`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }
//
//         if (res.length) {
//             console.log("found favoriteArtist: ", res);
//             result(null, res);
//             return;
//         }
//
//         // not found FavoriteArtist with the id
//         result({ kind: "not_found" }, null);
//     });
// }

// FavoriteArtist.findByArtistId = (id, result) => {
//     sql.query(`SELECT * FROM favoriteartist WHERE artistId = ${id}`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }
//
//         if (res.length) {
//             console.log("found favoriteArtist: ", res);
//             result(null, res);
//             return;
//         }
//
//         // not found FavoriteArtist with the id
//         result({ kind: "not_found" }, null);
//     });
// }


FavoriteArtist.update = (artistId, userId, favoriteArtist, result) => {
    sql.query(
        "UPDATE favoriteartist SET userId = ?, artistId = ? WHERE artistId = ?, userId = ?",
        [favoriteArtist.userId, favoriteArtist.artistId, artistId, userId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                // not found FavoriteArtist with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated favoriteArtist: ", { ...favoriteArtist });
            result(null, { ...favoriteArtist });
        }
    );
}

FavoriteArtist.remove = (artistId, userId, result) => {
    sql.query("DELETE FROM favoriteartist WHERE artistId = ? AND userId = ?", [artistId,userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found FavoriteArtist with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log(`deleted favoriteArtist: userId: ${userId}, artistId: ${artistId}  `);
        result(null, res);
    });
}

FavoriteArtist.removeAll = result => {
    sql.query("DELETE FROM favoriteartist", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} favoriteArtist`);
        result(null, res);
    });
}

module.exports = FavoriteArtist;

