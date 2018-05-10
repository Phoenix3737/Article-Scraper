

var articleScraper = {
    init: function () {
        this.bindListeners();
        $.get('/api/articles', function (results) {
            results.forEach(function (article) {
                var articleHTML = '<a class="article" href="' + article.url + '">' +
                    '<div class="headline" >' + article.headline + '</div>' +
                    '<div class="author" >' + article.author + '</div>' +
                '</a>'
                $('.articles').append(articleHTML);
            });
        })
    },
    bindListeners: function () {
        $('#find-articles').click(function () {
            $.get('/api/scrape', function (results) {
                results.forEach(function (article) {
                    var articleHTML = '<a class="article" href="' + article.url + '">' +
                        '<div class="headline" >' + article.headline + '</div>' +
                        '<div class="author" >' + article.author + '</div>' +
                    '</a>'
                    $('.articles').append(articleHTML);
                });
            })
        })
    }
};

$(document).ready(function(){
    articleScraper.init()
});

