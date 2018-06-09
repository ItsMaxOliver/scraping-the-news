const mongoose = require("mongoose");
const db = require("../models");

module.exports = function (app) {
    // Route for getting all Articles from the db when the saved flag is false
    app.get("/api/articles", function (req, res) {
        db.Article.find({
                saved: false
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // Route for getting all Articles from the db when the saved flag is true
    app.get("/api/articles/saved", function (req, res) {
        db.Article.find({
                saved: true
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // Route for grabbing a specific Article by id, populate it with it's note
    app.get("/api/articles/:id", function (req, res) {
        db.Article.findOne({
                _id: req.params.id
            })
            // populate all of the notes associated with it
            .populate("note")
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // Route for saving a specific article 
    app.put("/api/save/:id", function(req, res) {
        // find the article and set its saved flag to true
        db.Article.findOneAndUpdate({ _id : req.params.id }, { saved : true })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    // Route for unsaving a specific article
    app.put("/api/delete/:id", function(req, res) {
        db.Article.findOneAndUpdate({ _id : req.params.id }, { saved : false })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    });
};