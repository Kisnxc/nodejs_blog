class NewsController {
    // Get /news
    index(reg, res) {
        res.render('news');
    }

    // Get /news/:slug
    show(reg, res) {
        res.send('New details');
    }
}

module.exports = new NewsController();
