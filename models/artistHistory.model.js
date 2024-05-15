const sql = require("../db/dbConnection");


// constructor
const ArtistHistory = function (ArtistHistory) {
    this.artistId = ArtistHistory.artistId;
    this.userId = ArtistHistory.userId;
    this.createdAt = ArtistHistory.createdAt;
}

ArtistHistory.create = (newArtistHistory, result) => {
    sql.query("INSERT INTO artisthistory SET ?", newArtistHistory, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created artistHistory: ", {...newArtistHistory});
        result(null, {...newArtistHistory});
    });
}

ArtistHistory.getSortedArtistsList = (userId, result) => {
    let query =
        `SELECT id, name, coverImgUrl, bgcolor, description, type , AH.createdAt
    FROM artisthistory as AH
    INNER JOIN artist as A ON AH.artistId = A.Id
    WHERE userId = ${userId} ORDER BY createdAt DESC`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("artistHistory: ", res);
        result(null, res);
    });
}

ArtistHistory.getAll = (result) => {
    let query = "SELECT * FROM artisthistory";


    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("artistHistory: ", res);
        result(null, res);
    });
}

// ArtistHistory.findByIds = (artistId,userId, result) => {
//     sql.query(`SELECT * FROM artisthistory WHERE artistId = ${artistId} AND userId = ${userId}`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }

//         if (res.length) {
//             console.log("found artistHistory: ", res[0]);
//             result(null, res[0]);
//             return;
//         }

//         // not found ArtistHistory with the id
//         result({ kind: "not_found" }, null);
//     });
// }

// ArtistHistory.findByUserId = (id, result) => {
//     sql.query(`SELECT * FROM artisthistory WHERE userId = ${id}`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }

//         if (res.length) {
//             console.log("found artistHistory: ", res);
//             result(null, res);
//             return;
//         }

//         // not found ArtistHistory with the id
//         result({ kind: "not_found" }, null);
//     });
// }

// ArtistHistory.findByArtistId = (id, result) => {
//     sql.query(`SELECT * FROM artisthistory WHERE artistId = ${id}`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }

//         if (res.length) {
//             console.log("found artistHistory: ", res);
//             result(null, res);
//             return;
//         }

//         // not found ArtistHistory with the id
//         result({ kind: "not_found" }, null);
//     });
// }


ArtistHistory.update = (artistId, userId, result) => {
    sql.query(
        `UPDATE artisthistory SET createdAt = now() WHERE artistId = ${artistId} AND userId = ${userId}`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                // not found ArtistHistory with the id
                result({kind: "not_found"}, null);
                return;
            }

            console.log("updated artistHistory: ", {userId: userId, artistId: artistId});
            result(null, {userId: userId, artistId: artistId});
        }
    );
}

ArtistHistory.remove = (artistId, userId, result) => {
    sql.query("DELETE FROM artisthistory WHERE artistId = ? AND userId = ?", [artistId, userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found ArtistHistory with the id
            result({kind: "not_found", message: "artistHistory not found"}, null);
            return;
        }

        console.log("deleted artistHistory");
        result(null, {message: "delete artistHistory successfully"});
    });
}

ArtistHistory.removeAll = result => {
    sql.query("DELETE FROM artisthistory", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} artistHistory`);
        result(null, res);
    });
}

module.exports = ArtistHistory;

