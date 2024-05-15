const User = require("../models/user.model");
const HttpException = require("../utils/HttpException");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { getAllHistory } = require("./history.controller");
const Playlist = require("../models/playlist.model");
const AlbumHistory = require("../models/albumHistory.model");
const PlaylistHistory = require("../models/playlistHistory.model");
const ArtistHistory = require("../models/artistHistory.model");
const Album = require("../models/album.model");
const Artist = require("../models/artist.model");
const RefreshToken = require("../models/refreshToken.model");
dotenv.config();

exports.getInfoUserById = async (req, res, next) => {
  let user,
    likedSongs,
    likedAlbums,
    likedPlaylists,
    likedArtists,
    userPlaylists,
    homeData;
  let recentlyPlayed,
    madeForYou = [],
    popularPlaylists = [],
    popularAlbums = [],
    popularArtists = [];
  let albumHistory = [],
    playlistHistory = [],
    artistHistory = [];
  const userId = req.user.id;

  await Promise.all([
    User.findById(userId, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        user = res;
      }
    }),

    User.getSortedSongsList(userId, (err, res) => {
      if (err) {
        console.log(err);
      } else likedSongs = res;
    }),

    User.getSortedAlbumsList(userId, (err, res) => {
      if (err) {
        console.log(err);
      } else likedAlbums = res;
    }),

    User.getSortedArtistsList(userId, (err, res) => {
      if (err) {
        console.log(err);
      } else likedArtists = res;
    }),

    User.getSortedPlaylistsList(userId, (err, res) => {
      if (err) {
        console.log(err);
      } else likedPlaylists = res;
    }),

    Playlist.findByUserId(userId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          next(new HttpException(404, "Playlist not found"));
        } else {
          next(new HttpException(500, "Error retrieving Playlist"));
        }
      } else {
        userPlaylists = data;
      }
    }),

    Artist.getAll((err, res) => {
      if (err) {
        console.log(err);
      } else {
        popularArtists = res;
      }
    }),

    Album.getAll((err, res) => {
      if (err) {
        console.log(err);
      } else {
        popularAlbums = res;
      }
    }),

    Playlist.findByUserId(1, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          next(new HttpException(404, "Playlist not found"));
        } else {
          next(new HttpException(500, "Error retrieving Playlist"));
        }
      } else {
        popularPlaylists = data;
      }
    }),

    AlbumHistory.getSortedAlbumsList(userId, (err, res) => {
      if (err) {
        console.log(err);
      } else albumHistory = res;
    }),

    PlaylistHistory.getSortedPlaylistsList(userId, (err, res) => {
      if (err) {
        console.log(err);
      } else playlistHistory = res;
    }),

    ArtistHistory.getSortedArtistsList(userId, (err, res) => {
      if (err) {
        console.log(err);
      } else artistHistory = res;
    }),
  ]);

  setTimeout(() => {
    madeForYou = [...popularArtists, ...popularAlbums, ...popularPlaylists]
      .sort(() => Math.random() - 0.5)
      .slice(0, 15);
    popularArtists = popularArtists.sort(() => Math.random() - 0.5).slice(0, 3);
    popularAlbums = popularAlbums.sort(() => Math.random() - 0.5).slice(0, 3);
    popularPlaylists = popularPlaylists
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    recentlyPlayed = [...albumHistory, ...playlistHistory, ...artistHistory];
    recentlyPlayed.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, 100);
  setTimeout(() => {
    res.json({
      ...user,
      likedSongs,
      likedAlbums,
      likedPlaylists,
      likedArtists,
      homeData: {
        madeForYou: madeForYou,
        recentlyPlayed: recentlyPlayed,
        popularAlbums: popularAlbums,
        popularArtists: popularArtists,
        popularPlaylists: popularPlaylists,
      },
      userPlaylists,
    });
  }, 200);
};

getUserById = async (req, res) => {
  const user = await User.findOne({ id: req.params.id });
  if (!user) {
    throw new HttpException(404, "User not found");
  }

  const { password, ...userWithoutPassword } = user;

  res.send(userWithoutPassword);
};

getUserByUserName = async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) {
    throw new HttpException(404, "User not found");
  }

  const { password, ...userWithoutPassword } = user;

  res.send(userWithoutPassword);
};

getCurrentUser = async (req, res) => {
  const { password, ...userWithoutPassword } = req.user;

  res.send(userWithoutPassword);
};

exports.getAllUsers = async (req, res, next) => {
  if (req.user.type != "admin") {
    res.status(401).send("you are not admin");
  } else {
    User.getAll((err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          next(new HttpException(404, "User not found"));
        } else {
          next(new HttpException(500, "Error retrieving User"));
        }
      } else {
        res.send(data);
      }
    });
  }
};

exports.createUser = async (req, res) => {
  await this.hashPassword(req);

  try {
    User.create(req.body, (err, data) => {
      if (err) res.status(500).send({ message: err.message });
      else res.status(201).send({ message: "User was created!" });
    });
  } catch (error) {}

  // if (!result) {
  //     throw new HttpException(500, "Something went wrong");
  // }

  // res.status(201).send("User was created!");
};

exports.updateUser = async (req, res) => {
  // await this.hashPassword(req);

  try {
    User.updateById(req.user.id, req.body, (err, data) => {
      if (err) res.status(500).send({ message: err });
      else res.status(201).send({ message: "User was updated" });
    });
  } catch (error) {}
  // await this.hashPassword(req);

  // const {confirm_password, ...restOfUpdates} = req.body;

  // const result = await UserModel.update(restOfUpdates, req.params.id);

  // if (!result) {
  //     throw new HttpException(404, "Something went wrong");
  // }

  // const {affectedRows, changedRows, info} = result;

  // const message = !affectedRows ? "User not found" : affectedRows && changedRows ? "User updated successfully" : "Updated faild";

  // res.send({message, info});
};

deleteUser = async (req, res) => {
  const result = await User.delete(req.params.id);
  if (!result) {
    throw new HttpException(404, "User not found");
  }
  res.send("User has been deleted");
};

exports.userLogin = async (req, res) => {
  const username = req.body.username;
  const pass = req.body.password;
  console.log(pass);
  User.findByUsername(username, (err, user) => {
    if (!user) {
      res.status(401).send("Unable to login");
      return;
    }

    bcrypt.compare(pass, user.password, (err, result) => {
      if (!result) {
        res.status(401).send("Incorrect password!");
        return;
      }

      const accessToken = this.genToken(user);
      const refreshToken = this.genRefreshToken(user);

      //todo check if refresh token already exist ? create : update (wait for sql/promise fix)
      RefreshToken.create(user.id, refreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: false,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      const { password, ...userWithoutPassword } = user;

      res.send({ ...userWithoutPassword, accessToken });
    });

    // user matched!
  });
};

exports.userLogout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new HttpException(401, "You are not auth");
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
    if (err) {
      throw new HttpException(401, "Refresh Token is not valid");
    }

    //const rToken = await global.redisClient.lRange(user.id, 0, -1);
    RefreshToken.getAll((err, rToken) => {
      let tokenList = rToken.map((rToken) => rToken.token);
      if (!rToken || tokenList.indexOf(refreshToken) == -1) {
        throw new HttpException(401, "Token is not exist");
      }

      //const newRToken = tokenList.filter((token) => token != refreshToken);
      RefreshToken.remove(user.id);
      //RefreshToken.create(user.id, newRToken);
      return res.clearCookie("refreshToken").send("log out success");
    });

    // original
    // if (!rToken || rToken.indexOf(refreshToken) == -1) {
    //     throw new HttpException(401, "Token is not exist");
    // }

    // const newRToken = rToken.filter((token) => token != refreshToken);
    // await global.redisClient.del(user.id);
    // await global.redisClient.lPush(user.id, newRToken);
    // return res.clearCookie("refreshToken").send("log out success");
  });
};

exports.refreshRToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log(refreshToken);
  if (!refreshToken) {
    return res.status(401).json("You are not auth");
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
    if (err) {
      return res.status(401).json("Refresh Token is not valid");
    }

    RefreshToken.getAll((err, rToken) => {
      let tokenList = rToken.map((rToken) => rToken.token);
      if (!rToken || tokenList.indexOf(refreshToken) == -1) {
        throw new HttpException(401, "Token is not exist");
      }

      const newAccessToken = this.genToken(user);
      this.genToken(user);
      res.status(200).json(newAccessToken);
    });
    // const rToken = await global.redisClient.lRange(user.id, 0, -1);
    // if (!rToken || rToken.indexOf(refreshToken) == -1) {
    //     return res.status(401).json("Token is not exist");
    // }

    // const newAccessToken = this.genToken(user);
    // await global.redisClient.rPush(user.id, newAccessToken);

    // res.status(200).json(newAccessToken);
  });
};

// hash password if it exists
exports.hashPassword = async (req) => {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 8);
  }
};

exports.genToken = (user, expiresIn = "1000h") => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      type: user.type,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: expiresIn }
  );
};

exports.genRefreshToken = (user, expiresIn = "365d") => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      type: user.type,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: expiresIn }
  );
};
