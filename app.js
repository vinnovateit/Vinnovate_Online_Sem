var express = require("express");
var bodyParser = require("body-parser");

var allGroups = require("./json");
var file=require('./public/firebase-messaging-sw')
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.get("/", function (req, res) {
    res.render("index.ejs", {
        text: allGroups,
        file:file
    });
});
app.get("/form", function (req, res) {
    res.render("form.ejs");
});

app.post("/results", function (req, res) {
    var searched_subjects = [
        {
            "Sl.No": "410",
            Subject: "Web mining",
            "Faculty name": "Shashank mouli satapathy",
            Slot: "F1",
            "Whatsapp Link": "https://chat.whatsapp.com/HjyBmdmmbrw19Vwr0YfFDf",
            Telegram: "",
        },
    ];
    // console.log(req.body.subject);
    allGroups.forEach((element) => {
        var subject = element.Subject.toLowerCase();
        var teacher = element["Faculty name"].toLowerCase();
        var slot = element["Slot"].toLowerCase();
        var search = req.body.subject.toLowerCase();
        // console.log(subject);
        // console.log(search);
        // console.log(subject.includes(search));
        if (
            subject.includes(search) ||
            teacher.includes(search) ||
            slot.includes(search)
        ) {
            searched_subjects.unshift(element);
            // console.log("%%%%%%%%%%%%%%%%%%%%%%");
        }
    });
    console.log(searched_subjects);
    res.render("index.ejs", {
        text: searched_subjects,
    });
});

app.listen(process.env.PORT || 8000, function () {
    console.log("SERVER 8000 HAS STARTED");
});
