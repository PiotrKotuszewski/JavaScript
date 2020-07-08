const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const flash = require('express-flash');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'security is priority',
  resave: false,
  saveUninitialized: true,
  cookie:{
    maxAge:20*60*1000
  }
  // STORE
}));

app.use(flash());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));

const pageParamsHelper = (req, res, next) =>{
  res.locals.isUserLoggedIn = req.session.isUserLoggedIn;
  res.locals.loggedUser = req.session.loggedUser;
  next();
};

app.use(pageParamsHelper);

const autoCheck = require('./middleware/autoCheck');

const userController = require('./controller/userController');
const discoveryController = require('./controller/discoveryController');
const voteController = require('./controller/voteController');
const adminPanelController = require('./controller/adminPanelController');


app.use('/users', userController.route);
app.use('/discovery', autoCheck,  discoveryController.route);
app.use('/vote', autoCheck, voteController.route);
app.use('/adminPanel', autoCheck, adminPanelController.route);


app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
