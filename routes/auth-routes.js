const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    console.log('Calling google Consent Screen')
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    //need to destroy the cookies
    req.logout()
    res.redirect("/")
    // res.send('logging out');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));
// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    //passport.authenticate('google') sets the cookies and deserialise the object
    console.log('got conset with redirect uri')
    // res.send({
    //     code: req.query.code,
    //     user: req.user,
    //     scope: req.query.scope
    // });
    res.redirect('/profile')
});

module.exports = router;