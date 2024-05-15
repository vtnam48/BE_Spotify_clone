const SearchHistory = require("../models/searchHistory.model.js");
const HttpException = require("../utils/HttpException");

exports.createSearchHistory = async (req, res, next) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    const searchHistory = new SearchHistory({
        songId: req.body.songId,
        userId: req.body.userId,
    });

    SearchHistory.create(searchHistory, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the SearchHistory.",
            });
        else res.send(data);
    });
};

exports.getSearchHistoryByIds = async (req, res, next) => {
    SearchHistory.findByIds(
        req.params.songId,
        req.params.userId,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    next(new HttpException(404, "SearchHistory not found"));
                } else {
                    next(new HttpException(500, "Error retrieving SearchHistory"));
                }
            } else res.send(data);
        }
    );
};

exports.getSearchHistoryBySongId = async (req, res, next) => {
    SearchHistory.findBySongId(req.params.songId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                next(new HttpException(404, "SearchHistory not found"));
            } else {
                next(new HttpException(500, "Error retrieving SearchHistory"));
            }
        } else res.send(data);
    });
};

exports.getSearchHistoryByUserId = async (req, res, next) => {
    SearchHistory.findByUserId(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                next(new HttpException(404, "SearchHistory not found"));
            } else {
                next(new HttpException(500, "Error retrieving SearchHistory"));
            }
        } else res.send(data);
    });
};

exports.getAllSearchHistorys = async (req, res, next) => {
    SearchHistory.getAll(req.query.songId, (err, data) => {
        if (err) next(new HttpException(500, "Error retrieving Songs"));
        else res.send(data);
    });
};

exports.updateSearchHistoryByIds = async (req, res, next) => {
    SearchHistory.updateByIds(
        req.params.songId,
        req.params.userId,
        new SearchHistory(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    next(new HttpException(404, "SearchHistory not found"));
                } else {
                    next(new HttpException(500, "Error updating SearchHistory"));
                }
            } else res.send(data);
        }
    );
};

exports.deleteSearchHistoryByIds = async (req, res, next) => {
    SearchHistory.remove(
        req.params.songId,
        req.params.userId,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    next(new HttpException(404, "SearchHistory not found"));
                } else {
                    next(new HttpException(500, "Error deleting SearchHistory"));
                }
            } else res.send({ message: `SearchHistory was deleted successfully!` });
        });
};
