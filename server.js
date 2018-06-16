const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const handle = require("express-handlebars");

const PORT =process.env.PORT || 3000;

// Initialize Express
const app = express();

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

app.engine("handlebars", handle({ defaultLayout : "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
// If deployed, use the deployed database. Otherwise use the local latimes database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/latimes";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Routes
require("./routes/scrape-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/article-routes.js")(app);
require("./routes/note-routes.js")(app);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
