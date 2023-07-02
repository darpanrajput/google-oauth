const router = require('express').Router();

const authChecks = async (req, res, next) => {
    if (!req.user) {
        res.redirect("/auth/login")
    } else {
        next()
    }
}
router.get('/', authChecks, async (req, res) => {

    res.render('profile', { user: req.user });
});

module.exports = router;