require("dotenv/config")
const express = require('express');
const authRoutes = require('./routes/auth-routes');

const app = express();

// set view engine
app.set('view engine', 'ejs');

// set up routes
app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
    console.log("env", process.env.CLIENT_ID)
    res.render('home');
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});