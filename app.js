const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./Controllers/error');

const db = require('./util/database');
const app = express();

// setting ejs templates and its folder
app.set('view engine', 'ejs');
app.set('views', 'views');

// including the routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// body parser for importing request body data
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// admin routes
app.use('/admin', adminRoutes);

// shop routes
app.use(shopRoutes);

// not found
app.use(errorController.get404);

app.listen(3000);
