const sql = require("../db/dbConnection");


// constructor
const FavoriteAlbum = function (FavoriteAlbum) {
    this.albumId = FavoriteAlbum.albumId;
    this.userId = FavoriteAlbum.userId;
    this.createdAt = FavoriteAlbum.createdAt;
}

FavoriteAlbum.create = (newFavoriteAlbum, result) => {
    sql.query("INSERT INTO favoritealbum SET ?", newFavoriteAlbum, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created favoriteAlbum: ", { ...newFavoriteAlbum });
        result(null, { ...newFavoriteAlbum });
    });
}

FavoriteAlbum.getSortedAlbumsList = (userId, result) => {
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

FavoriteAlbum.getAll = (result) => {
    let query = "SELECT * FROM favoritealbum";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("favoriteAlbum: ", res);
        result(null, res);
    });
}

// FavoriteAlbum.findByIds = (albumId,userId, result) => {
//     sql.query(`SELECT * FROM favoritealbum WHERE albumId = ${albumId} AND userId = ${userId}`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }
//
//         if (res.length) {
//             console.log("found favoriteAlbum: ", res[0]);
//             result(null, res[0]);
//             return;
//         }
//
//         // not found FavoriteAlbum with the id
//         result({ kind: "not_found" }, null);
//     });
// }
//
// FavoriteAlbum.findByUserId = (id, result) => {
//     sql.query(`SELECT * FROM favoritealbum WHERE userId = ${id}`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }
//
//         if (res.length) {
//             console.log("found favoriteAlbum: ", res);
//             result(null, res);
//             return;
//         }
//
//         // not found FavoriteAlbum with the id
//         result({ kind: "not_found" }, null);
//     });
// }
//
// FavoriteAlbum.findByAlbumId = (id, result) => {
//     sql.query(`SELECT * FROM favoritealbum WHERE albumId = ${id}`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }
//
//         if (res.length) {
//             console.log("found favoriteAlbum: ", res);
//             result(null, res);
//             return;
//         }
//
//         // not found FavoriteAlbum with the id
//         result({ kind: "not_found" }, null);
//     });
// }


FavoriteAlbum.update = (albumId, userId, favoriteAlbum, result) => {
    sql.query(
        "UPDATE favoritealbum SET userId = ?, albumId = ? WHERE albumId = ?, userId = ?",
        [favoriteAlbum.userId, favoriteAlbum.albumId, albumId, userId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                // not found FavoriteAlbum with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated favoriteAlbum: ", { ...favoriteAlbum });
            result(null, { ...favoriteAlbum });
        }
    );
}

FavoriteAlbum.remove = (albumId, userId, result) => {
    sql.query("DELETE FROM favoritealbum WHERE albumId = ? AND userId = ?", [albumId,userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found FavoriteAlbum with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log(`deleted favoriteAlbum: userId: ${userId}, albumId: ${albumId}  `);
        result(null, res);
    });
}

FavoriteAlbum.removeAll = result => {
    sql.query("DELETE FROM favoritealbum", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} favoriteAlbum`);
        result(null, res);
    });
}

module.exports = FavoriteAlbum;

