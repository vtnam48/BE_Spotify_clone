const FavoriteSong = require("../models/favoriteSong.model")
const FavoriteAlbum = require("../models/favoriteAlbum.model");
const FavoriteArtist = require("../models/favoriteArtist.model");
const FavoritePlaylist = require("../models/favoritePlaylist.model");

exports.createFavoriteSong = async (req, res, next) => {
    let favoriteSongList,
        exist = false,
        //userId = req.body.userId,
        userId = req.user.id,
        songId = req.body.songId;

    FavoriteSong.getAll((err, res) => {
        if (err) {
            console.log(err);
        }
        favoriteSongList = res;

        favoriteSongList.forEach((favoriteSong) => {
            if (
                favoriteSong.userId === userId &&
                favoriteSong.songId === songId
            )
                exist = true;
        });
    });
    //check if this favoriteSong already exist in db

    setTimeout(() => {
        const favoriteSong = new FavoriteSong({
            userId: userId,
            songId: songId,
        });

        if (exist) {
            FavoriteSong.remove(userId, songId, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while updating the Favorite.",
                    });
                else res.send(data);
            });
        } else
            FavoriteSong.create(favoriteSong, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Favorite.",
                    });
                else res.send(data);
            });
    }, 200);
};

exports.createFavoriteArtist = async (req, res, next) => {
    let favoriteArtistList,
        exist = false,
        //userId = req.body.userId,
        userId = req.user.id,
        artistId = req.body.artistId;

    //check if this favoriteArtist already exist in db
    FavoriteArtist.getAll((err, res) => {
        if (err) {
            console.log(err);
        }
        favoriteArtistList = res;

        favoriteArtistList.forEach((favoriteArtist) => {
            if (
                favoriteArtist.userId === userId &&
                favoriteArtist.artistId === artistId
            )
                exist = true;
        });
    });

    setTimeout(() => {
        const favoriteArtist = new FavoriteArtist({
            userId: userId,
            artistId: artistId,
        });

        if (exist) {
            FavoriteArtist.remove(artistId, userId, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while updating the history.",
                    });
                else res.send(data);
            });
        } else
            FavoriteArtist.create(favoriteArtist, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the history.",
                    });
                else res.send(data);
            });
    }, 200)

};

exports.createFavoriteAlbum = async (req, res, next) => {
    let favoriteAlbumList,
        exist = false,
        //userId = req.body.userId,
        userId = req.user.id,
        albumId = req.body.albumId;

    //check if this favoriteAlbum already exist in db
    FavoriteAlbum.getAll((err, res) => {
        if (err) {
            console.log(err);
        }
        favoriteAlbumList = res;

        favoriteAlbumList.forEach((favoriteAlbum) => {
            if (
                favoriteAlbum.userId === userId &&
                favoriteAlbum.albumId === albumId
            )
                exist = true;
        });
    });

    setTimeout(() => {
        const favoriteAlbum = new FavoriteAlbum({
            userId: userId,
            albumId: albumId,
        });

        if (exist) {
            FavoriteAlbum.remove(albumId, userId, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while updating the history.",
                    });
                else res.send(data);
            });
        } else
            FavoriteAlbum.create(favoriteAlbum, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the history.",
                    });
                else res.send(data);
            });
    }, 200)

};

exports.createFavoritePlaylist = async (req, res, next) => {
    let favoritePlaylistList,
        exist = false,
        //userId = req.body.userId,
        userId = req.user.id,
        playlistId = req.body.playlistId;

    FavoritePlaylist.getAll((err, data) => {
        if (err) {
            console.log(err);
        }
        favoritePlaylistList = data;

        favoritePlaylistList.forEach((favoritePlaylist) => {
            if (
                favoritePlaylist.userId === userId &&
                favoritePlaylist.playlistId === playlistId
            )
                exist = true;
        });
    });
    //check if this favoritePlaylist already exist in db

    setTimeout(() => {
        const favoritePlaylist = new FavoritePlaylist({
            userId: userId,
            playlistId: playlistId,
        });

        if (exist) {
            FavoritePlaylist.remove(playlistId,userId, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while updating the history.",
                    });
                else res.send(data);
            });
        } else
            FavoritePlaylist.create(favoritePlaylist, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the history.",
                    });
                else res.send(data);
            });
    }, 200);
};
