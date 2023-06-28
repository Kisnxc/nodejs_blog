const express = require('express');
const app = express();
const port = 3000;
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');

const SortMiddleware = require('./app/middlewares/SortMiddleware');

const cookieParser = require('cookie-parser');

//Connect DBS
const db = require('./config/db');
db.connect();





//Set Route
const route = require('./routes');

app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
//Custom Middleware
app.use(SortMiddleware);
app.use(cookieParser());
app.use(express.json());

//HTTP logger
//app.use(morgan('combined'))

//Template engine


app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {

                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                };

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                }

                const icon = icons[sortType];
                const type = types[sortType];


                return `<a href="?_sort&column=${field}&type=${type}">
                <span class="${icon}"></span>
            </a>`
            },
            getEmail: function (user) {
                return user && user.email ? user.email : 'Guest';
            },
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', './src/resources/views');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Route init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
