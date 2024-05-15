const sql = require("../db/dbConnection");

// constructor
const AlbumHistory = function (AlbumHistory) {
  this.albumId = AlbumHistory.albumId;
  this.userId = AlbumHistory.userId;
  this.createdAt = AlbumHistory.createdAt;
};

AlbumHistory.create = (newAlbumHistory, result) => {
  sql.query("INSERT INTO albumhistory SET ?", newAlbumHistory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created albumHistory: ", { ...newAlbumHistory });
    result(null, { ...newAlbumHistory });
  });
};
AlbumHistory.getSortedAlbumsList = (userId, result) => {
  let query = 
  `SELECT id, name, albumId, coverImgUrl, bgcolor, description, type , AH.createdAt
  FROM albumhistory as AH
  INNER JOIN album as A ON AH.albumId = A.Id
  WHERE userId = ${userId} ORDER BY AH.createdAt DESC`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("albumHistory: ", res);
    result(null, res);
  });
};

AlbumHistory.getAll = (result) => {
    let query = "SELECT * FROM albumhistory";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("albumHistory: ", res);
        result(null, res);
    });
}

// AlbumHistory.findByIds = (albumId,userId, result) => {
//     sql.query(`SELECT * FROM albumhistory WHERE albumId = ${albumId} AND userId = ${userId}`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }

//         if (res.length) {
//             console.log("found albumHistory: ", res[0]);
//             result(null, res[0]);
//             return;
//         }

//         // not found AlbumHistory with the id
//         result({ kind: "not_found" }, null);
//     });
// }

// AlbumHistory.findByUserId = (id, result) => {
//     sql.query(`SELECT * FROM albumhistory WHERE userId = ${id}`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }

//         if (res.length) {
//             console.log("found albumHistory: ", res);
//             result(null, res);
//             return;
//         }

//         // not found AlbumHistory with the id
//         result({ kind: "not_found" }, null);
//     });
// }

// AlbumHistory.findByAlbumId = (id, result) => {
//     sql.query(`SELECT * FROM albumhistory WHERE albumId = ${id}`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }

//         if (res.length) {
//             console.log("found albumHistory: ", res);
//             result(null, res);
//             return;
//         }

//         // not found AlbumHistory with the id
//         result({ kind: "not_found" }, null);
//     });
// }


AlbumHistory.update = (albumId, userId, result) => {
    sql.query(
        `UPDATE albumhistory SET createdAt = now() WHERE albumId = ${albumId} AND userId = ${userId}`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                // not found albumHistory with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated albumHistory: ", {userId: userId, albumId: albumId});
            result(null, {userId: userId, albumId: albumId} );
        }
    );
}

AlbumHistory.remove = (albumId, userId, result) => {
  sql.query(
    "DELETE FROM albumhistory WHERE albumId = ? AND userId = ?",
    [albumId, userId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows === 0) {
        // not found AlbumHistory with the id
        result({ kind: "not_found", message: "AlbumHistory not found" }, null);
        return;
      }

      console.log("deleted albumHistory");
      result(null,  {message: "delete AlbumHistory successfully"});
    }
  );
};

AlbumHistory.removeAll = (result) => {
  sql.query("DELETE FROM albumhistory", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} albumHistory`);
    result(null, res);
  });
};

module.exports = AlbumHistory;
