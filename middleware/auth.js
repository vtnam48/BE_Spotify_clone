const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const HttpException = require("../utils/HttpException");

module.exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const bearer = "Bearer ";

    if (!authHeader || !authHeader.startsWith(bearer)) {
      res.status(401).send({message: "Access denied. No credentials sent!"});
    }

    const token = authHeader.replace(bearer, "");
    const secretKey = process.env.JWT_ACCESS_KEY || "";

    // Verify Token
    const decoded = jwt.verify(token, secretKey);
    

    User.findById(decoded.id, (err,data)=>{
      if(err) res.status(401).send({message:"Authentication failed!"})
      req.user = data
    next();
    })

    // old code
    // const user = await User.findOne({ id: decoded.id });
    // if (!user) {
    //   throw new HttpException(401, "Authentication failed!");
    // }

    // req.user = user;
    // next();
  } catch (e) {
    e.status = 401;
    next(e);
  }
};
