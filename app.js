require("dotenv/config")
const express = require('express');

const mongoose = require('mongoose')
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const passport = require("passport");
const app = express();
const cookiSession = require('cookie-session')

mongoose.set('strictQuery', true);
const connect = mongoose.connect('mongodb://localhost:27017/OAuth', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.use(express.json())
// set view engine
app.set('view engine', 'ejs');

app.use(cookiSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_ENCRYPTION_COOKIE]
}));

//initialise passport

app.use(passport.initialize())
app.use(passport.session())//uses session storage to manage the cookies

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
    console.log("env", process.env.CLIENT_ID)

    res.render('home', { user: req.user });
});

app.listen(3000, () => {
    connect.then(res => console.log('connect to mongo'))
        .catch(er => console.log("mongo connect failed=", er))
    console.log('app now listening for requests on port 3000');
});