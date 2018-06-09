const mongoose = require("mongoose");
const db = require("../models");

module.exports = function (app) {
    // Route for saving/updating an Article's associated Note
    app.post("/api/articles/:id", function (req, res) {
        // Create a new note and pass the req.body to the entry
        db.Note.create(req.body)
            .then(function (dbNote) {
                return db.Article.findOneAndUpdate({
                    _id: req.params.id
                }, {
                    note: dbNote._id
                }, {
                    new: true
                });
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // Route for deleting an Article's associated Note
    app.delete("/api/articles/:id", function (req, res) {
        db.Note.findOneAndRemove({
                _id: req.body._id
            })
            .then(function (dbNote) {
                return db.Article.findOneAndUpdate({
                    _id: req.params.id
                }, {
                    $pull: {
                        note: req.body._id
                    }
                });
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
};