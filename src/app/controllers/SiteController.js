class SiteController {
    // Get /
    index(reg, res) {
        res.render('home');
    }

    // Get /search
    search(reg, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
