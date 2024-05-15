const sql = require("../db/dbConnection");

// constructor
const Genre = function (genre) {
    this.id = genre.id;
    this.name = genre.name;
    this.coverImgUrl = genre.coverImgUrl;
    this.bgcolor = genre.bgcolor;
    this.description = genre.description;
}

Genre.create = (newGenre, result) => {
    sql.query("INSERT INTO genres SET ?", newGenre, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created genre: ", { id: res.insertId, ...newGenre });
        result(null, { id: res.insertId, ...newGenre });
    });
}

Genre.findById = (id, result) => {
    sql.query(`SELECT * FROM genres WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found genre: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Genre with the id
        result({ kind: "not_found" }, null);
    });
}

Genre.findByName = (name, result) => {
    sql.query(`SELECT * FROM genres WHERE name = '${name}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found genre: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Genre with the name
        result({ kind: "not_found" }, null);
    });
}

Genre.getAll = (name, result) => {
    let query = "SELECT * FROM genres";

    if (name) {
        query += ` WHERE name LIKE '%${name}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("genres: ", res);
        result(null, res);
    });
}

Genre.updateById = (id, genre, result) => {
    sql.query(
        "UPDATE genres SET name = ?, coverImgUrl = ?, bgcolor = ?, description = ? WHERE id = ?",
        [genre.name, genre.coverImgUrl, genre.bgcolor, genre.description, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                // not found Genre with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated genre: ", { id: id, ...genre });
            result(null, { id: id, ...genre });
        }
    );
}

Genre.remove = (id, result) => {
    sql.query("DELETE FROM genres WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found Genre with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted genre with id: ", id);
        result(null, res);
    });
}

Genre.removeAll = result => {
    sql.query("DELETE FROM genres", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} genres`);
        result(null, res);
    });
}

module.exports = Genre;
