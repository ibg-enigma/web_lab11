const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const routes = require('./routes/urls')
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

async function start() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/lab11');
        app.listen(PORT, () => {
            console.log('Server has been started...');
        })
    } catch (e) {
        console.log(e);
    }
}

start();