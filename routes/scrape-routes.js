// Scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

const mongoose = require("mongoose");
const db = require("../models");

module.exports = function (app) {
    // A GET route for scraping the latimes website
    app.get("/scrape", function (req, res) {

        axios.get("http://www.latimes.com/").then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);

            // Now, we grab every h5 within an card-content tag, and do the following:
            $("h5").each(function (i, element) {
                var result = {};

                result.title = $(this)
                    .children("a")
                    .text();
                result.summary = $(this)
                    .children("p")
                    .text();
                result.link = $(this)
                    .children("a")
                    .attr("href");
                result.saved = false;

                // Create a new Article using the `result` object built from scraping
                db.Article.create(result)
                    .then(function (dbArticle) {})
                    .catch(function (err) {
                        return res.json(err);
                    });
            });

            // on success redirect to index
            res.redirect("/");
        });
    });
};