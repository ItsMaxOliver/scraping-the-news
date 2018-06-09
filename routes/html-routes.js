const db = require("../models");

module.exports = function (app) {
    // Route to render home page
    app.get("/", function (req, res) {
        res.render("index");
    });

    // Route to render saved articles page
    app.get("/saved", function (req, res) {
        res.render("saved");
    });

};