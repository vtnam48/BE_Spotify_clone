const sql = require("../db/dbConnection");

const RefreshToken = function (refreshToken) {
  this.userId = refreshToken.id;
  this.token = refreshToken.token;
}

RefreshToken.create = (userId, token) =>{
  sql.query("INSERT INTO refreshtoken SET ?", {userId: userId, token: token}, (err, res) => {
    if (err) {
      console.log("error: ", err);
      
      return;
    }

    console.log("create token sucessfully: " + token);
    
  });
}

RefreshToken.getAll = (result) => {
  sql.query("SELECT * FROM refreshtoken", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("token: ", res);
    result(null, res);
  });
};

RefreshToken.remove = (id, result) => {
  sql.query("DELETE FROM refreshtoken WHERE userId = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      return;
    }

    if (res.affectedRows === 0) {
      // not found Song with the id
      console.log("token not found");
      return;
    }

    console.log("deleted token with id: ", id);
  });
};

module.exports = RefreshToken