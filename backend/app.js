const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dataBaseConfig = require('./database/db');


// Connexion à la MongoDB
mongoose.Promise = global.Promise;

mongoose.connect(dataBaseConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Connexion à la base de donnnées réussit');
},
    error => {
        console.log('Connexion à la base de données impossible' + error);
    }
);

// Appel de la route de musique
const songRoute = require('./routes/song.route');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors());

// Racine de l'API 
app.use('/api', songRoute);

// Le port de l'API
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Connecté sur le PORT: ${port}`);
});

// Si vous trouvez l'erreur 404 on redirige vers le gestionnaire
app.use((req, res, next) => {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if(!err.statusCode)
    {
        err.statusCode = 500;
    }
    res.status(err.statusCode).send(err.message);
});

