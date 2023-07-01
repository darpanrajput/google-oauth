const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    }, () => {
        // passport callback function
    })
);