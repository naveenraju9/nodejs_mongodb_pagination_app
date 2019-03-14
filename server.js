const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const channels = require('./models/Channels');
const app = express();

app.use(express.static('./public'));

//midllEWARE for bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');

//DB config
const db = require('./config/apikeys').mongoURI;

//connect to mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

//Use Route
const port = 5000;
//front page route
app.get('/', function (req, res) {
    res.render('index');
});
app.post('/channels', function (req, res,next) {
    console.log(req.body);

    if (req.body.select != 'undefined') {
        var sort = req.body.select;
    }

    var perPage = 9
    var page = req.body.page || 1

    //var search = req.body.search;
    console.log(req.body.search);
    console.log(req.body.search_field);

    if (req.body.search != undefined && req.body.search_field != undefined && req.body.search != '' && req.body.search_field != '') {
        console.log('if');
        var search = req.body.search;
        var search_field = req.body.search_field;
        var query = { 'search': search_field };

        if (search == 'Channel name') {
            var query = { name: search_field };
        } else if (search == 'Grade') {
            var query = { email: search_field };
        } else {
            var query = { 'Channel name': { $ne: null } };
        }
    }
    channels.find(query).skip((perPage * page) - perPage).limit(perPage).sort(sort)
        .exec(function (err, user) {
            channels.countDocuments(query).exec(function (err, count) {
                if (err) return next(err)
                console.log(user);
                  res.render('channels', {
                    user: user,
                    current: page,
                    pages: Math.ceil(count / perPage),
                    sort: sort,
                    search: search
                })
            })
        })
})

app.listen(port, () => { console.log(`server started on port ${port}`) }
);