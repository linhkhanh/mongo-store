
// DEPENDENCIES
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;

// MONGODB
const db = require('./db');

// middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'randomsecret' }));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));


require('./routes')(app);

// ==================== LISTENER ====================
db.connect().then(() => app.emit('ready'));

app.on('ready', () => {
    app.listen(port, () => console.log('app on port 3000'));
});

