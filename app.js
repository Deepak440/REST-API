const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true, useUnifiedTopology: true });

// Create Schema
const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

// Create Model
const Article = mongoose.model('Article', articleSchema);


app.route("/articles")
    .get(function (req, res) {
        Article.find(function (err, result) {
            if (!err) {
                res.send(result);
            }
            else {
                res.send(err);
            }
        });

    })
    .post(function (req, res) {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save(function (err) {
            if (!err) {
                res.send("Succfully added");
            }
            else {
                res.send(err);
            }
        });

    })
    .delete(function (req, res) {
        Article.deleteMany( function (err) {
            if (!err) {
                res.send("Succesfullly deleted");
            }
            else {
                res.send(err);
            }
        })

    });

app.listen(3000, function (req, res) {
    console.log("Server is running at 3000");
});