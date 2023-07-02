const passport = require('passport');
const User = require('../models/user');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {

    User.findById(id).then((user) => {
        //this done method will set req.user in any subsequent requests
        done(null, user)
    }).catch((err) => {
        done(err, null)
    })
})
passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    }, (accessToken, refreshToken, profile, done) => {
        console.log("accessToken=", accessToken)
        console.log("refreshToken=", refreshToken)
        console.log("profile=", profile)
        console.log("done=", done)
        // passport callback function
        //checking if user exits

        User.findOne({
            googleId: profile.id
        }).then((user) => {
            console.log('found user==', user)
            if (user) {
                done(null, user)
            } else {
                //saving to mongo db
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then((res) => {
                    console.log('new user created:' + res)
                    done(null, res)
                }).catch(err => console.log("user creation eror:" + err))
            }
        }).catch(err => console.log("fetching creation eror:" + err))


    })
);