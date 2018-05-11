const request = require("request");
const express = require("express");
const cheerio = require('cheerio');
const Article = require('../models/article');
const Comment = require('../models/comment');
const router = express.Router();

router.get("/articles", function (req, res) {
    Article.find()
        .then(function (articles) {
            res.json(articles);
        })
        .catch(function (err) {
            console.log(err);
        })
});

router.get("/scrape", function (req, res) {
    request({
        method: 'GET',
        url: 'https://www.sbnation.com/'
    }, function (err, response, body) {
        if (err) return res.status(500).send(err);

        // Tell Cherrio to load the HTML
        $ = cheerio.load(body);
        let result = [];
        $(".c-compact-river__entry").each(function () {
            const headline = $(".c-entry-box--compact__title a", this).text();
            const articleData = {
                headline,
                author: $(".c-byline__item a", this).text(),
                url: $(".c-entry-box--compact__image-wrapper", this).attr('href')
            }
            
            result.push(articleData);
            
            Article.findOne({ headline })
                .then(function(article) {
                   
                    return Article.create(articleData)
                        .then(function () {
                            console.log("Article Created", article);
                            
                        })
                        .catch(function(err) {
                            console.log(err);
                        })
                })
                .catch(function(err) {
                    console.log(err)
                })

        })
        res.json(result);
    });
});

router.get("/articles/:id/comments", function (req, res) {
    Comment.find({
        article: new ObjectId(req.params.id)
    })
        .populate('article')
        .then(function (comments) {
            res.json(comments);
        })
        .catch(function (err) {
            console.log(err);
        })
});

module.exports = router;