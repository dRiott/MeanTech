exports.render = function(req, res) {
    res.render('index', {
        title: 'Motha fucka I\'m ill',
        user: req.user ? req.user.username : ''
    });
};