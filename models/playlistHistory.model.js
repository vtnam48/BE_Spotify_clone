const sql = require("../db/dbConnection");


// constructor
const PlaylistHistory = function (PlaylistHistory) {
    this.playlistId = PlaylistHistory.playlistId;
    this.userId = PlaylistHistory.userId;
    this.createdAt = PlaylistHistory.createdAt;
}

PlaylistHistory.create = (newPlaylistHistory, result) => {
    sql.query("INSERT INTO playlisthistory SET ?", newPlaylistHistory, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created playlistHistory: ", { ...newPlaylistHistory });
        result(null, { ...newPlaylistHistory });
    });
}
PlaylistHistory.getSortedPlaylistsList = (userId, result) => {
    let query = 
    `SELECT id, name, P.userId, coverImgUrl, bgcolor, type , PH.createdAt
    FROM playlisthistory as PH
    INNER JOIN playlist as P ON PH.playlistId = P.Id
    WHERE PH.userId = ${userId} ORDER BY P.createdAt DESC`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("playlistHistory: ", res);
        result(null, res);
    });
}

PlaylistHistory.getAll = (result) => {
    let query = "SELECT * FROM playlisthistory";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("playlistHistory: ", res);
        result(null, res);
    });
}


PlaylistHistory.update = (playlistId, userId, result) => {
    sql.query(
        `UPDATE playlisthistory SET createdAt = now() WHERE playlistId = ${playlistId} AND userId = ${userId}`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                // not found playlistHistory with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated playlistHistory: ", {userId: userId, playlistId: playlistId});
            result(null, {userId: userId, playlistId: playlistId} );
        }
    );
}
// PlaylistHistory.findByIds = (playlistId,userId, result) => {
//     sql.query(`SELECT * FROM playlisthistory WHERE playlistId = ${playlistId} AND userId = ${userId}`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }

//         if (res.length) {
//             console.log("found playlistHistory: ", res[0]);
//             result(null, res[0]);
//             return;
//         }

//         // not found PlaylistHistory with the id
//         result({ kind: "not_found" }, null);
//     });
// }

// PlaylistHistory.findByUserId = (id, result) => {
//     sql.query(`SELECT * FROM playlisthistory WHERE userId = ${id}`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }

//         if (res.length) {
//             console.log("found playlistHistory: ", res);
//             result(null, res);
//             return;
//         }

//         // not found PlaylistHistory with the id
//         result({ kind: "not_found" }, null);
//     });
// }

// PlaylistHistory.findByPlaylistId = (id, result) => {
//     sql.query(`SELECT * FROM playlisthistory WHERE playlistId = ${id}`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }

//         if (res.length) {
//             console.log("found playlistHistory: ", res);
//             result(null, res);
//             return;
//         }

//         // not found PlaylistHistory with the id
//         result({ kind: "not_found" }, null);
//     });
// }

PlaylistHistory.remove = (playlistId, userId, result) => {
    sql.query("DELETE FROM playlisthistory WHERE playlistId = ? AND userId = ?", [playlistId,userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found PlaylistHistory with the id
            result({ kind: "not_found", message: "PlaylistHistory not found" }, null);
            return;
        }

        console.log("deleted playlistHistory");
        result(null,  {message: "delete PlaylistHistory successfully"});
    });
}

PlaylistHistory.removeAll = result => {
    sql.query("DELETE FROM playlisthistory", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} playlistHistory`);
        result(null, res);
    });
}

module.exports = PlaylistHistory;

