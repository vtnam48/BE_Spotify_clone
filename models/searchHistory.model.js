const sql = require("../db/dbConnection");


// constructor
const SearchHistory = function (SearchHistory) {
    this.songId = SearchHistory.songId;
    this.userId = SearchHistory.userId;
}

SearchHistory.create = (newSearchHistory, result) => {
    sql.query("INSERT INTO searchhistory SET ?", newSearchHistory, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created searchHistory: ", { ...newSearchHistory });
        result(null, { ...newSearchHistory });
    });
}

SearchHistory.findByIds = (songId,userId, result) => {
    sql.query(`SELECT * FROM searchhistory WHERE songId = ${songId} AND userId = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found searchHistory: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found SearchHistory with the id
        result({ kind: "not_found" }, null);
    });
}

SearchHistory.findByUserId = (id, result) => {
    sql.query(`SELECT * FROM searchhistory WHERE userId = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found searchHistory: ", res);
            result(null, res);
            return;
        }

        // not found SearchHistory with the id
        result({ kind: "not_found" }, null);
    });
}

SearchHistory.findBySongId = (id, result) => {
    sql.query(`SELECT * FROM searchhistory WHERE songId = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found searchHistory: ", res);
            result(null, res);
            return;
        }

        // not found SearchHistory with the id
        result({ kind: "not_found" }, null);
    });
}

SearchHistory.getAll = (songId, result) => {
    let query = "SELECT * FROM searchhistory";

    if (songId) {
        query += ` WHERE name LIKE '%${songId}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("searchHistory: ", res);
        result(null, res);
    });
}

SearchHistory.updateByIds = (songId,userId, searchHistory, result) => {
    sql.query(
        "UPDATE searchhistory SET userId = ?, songId = ? WHERE songId = ?, userId = ?",
        [searchHistory.userId, searchHistory.songId, songId, userId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                // not found SearchHistory with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated searchHistory: ", { ...searchHistory });
            result(null, { ...searchHistory });
        }
    );
}

SearchHistory.remove = (songId, userId, result) => {
    sql.query("DELETE FROM searchhistory WHERE songId = ?, userId = ?", [songId,userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found SearchHistory with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted searchHistory with id: ", id);
        result(null, res);
    });
}

SearchHistory.removeAll = result => {
    sql.query("DELETE FROM searchhistory", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} searchHistory`);
        result(null, res);
    });
}

module.exports = SearchHistory;

