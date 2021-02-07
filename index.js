const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

/* Make all variables from our .env file available in our process */
require('dotenv').config();

/* Init express */
const app = express();

/* Init helmet and CORS */
app.use(helmet({contentSecurityPolicy: false,}));

/* Set view engine */
app.set('view engine', 'ejs');

/* Setup the middlewares & configs */
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());


app.use(require('./routes'));

app.get('*', (req, res) => {
    res.status(404).render('404');
});


/* Listen on the port for requests */
app.listen(process.env.PORT || 3000, () => {
    console.log('Express server listening on port %d in %s mode', process.env.PORT, app.settings.env);
});

module.exports = app;