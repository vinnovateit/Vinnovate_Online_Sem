var express = require("express");
var bodyParser = require("body-parser");

var allGroups = require("./json");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
    res.render("index.ejs", {
        text: allGroups,
    });
});

app.listen(process.env.PORT || 8000, function () {
    console.log("SERVER 8000 HAS STARTED");
});
