//Set enviroment variables
const dotenv = require('dotenv'); //must be the first two lines of code
dotenv.config({ path: './config.env' });

//Template for Node.js Express Server
const express = require('express');

//Create Express App
const app = express();

//create https and fs
const https = require('https');
const fs = require('fs');

//Set the options for key and cert
const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}

//body-parser is a middleware that parses incoming requests with JSON payloads and is based on body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

//Path module provides utilities for working file and directory paths
const path = require('path');

//dirname is the directory name of the current module
app.use(express.static(path.join(__dirname, 'public')));

//Use morgan for logging and debugging purposes
const morgan = require('morgan-body');

//middleware
//Create a write stream (in append mode)
var rfs = require('rotating-file-stream') //version 2.x

//Serve static files
//Create a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', //rotate daily
  path: path.join(__dirname, 'log') //Log directory will log all data here
}); //set up the logger

morgan(app, {
  stream: accessLogStream,
  noColors: true,
  logReqUserAgent: true,
  logRequestBody: true,
  logResponseBody: true,
  logReqCookies: true,
  logReqSignedCookies: true
});

//Set the view engine to ejs
app.set('view engine', 'ejs');

//Set the views directory
app.set('views', 'views');

//routes are defined in the routes folder
const authenticationRoute = require('./routes/authenticationRoute');
app.use('/api', authenticationRoute);
const customerRoute = require('./routes/customerRoutes');
app.use('/api/customers', customerRoute);
const loanRoute = require('./routes/loanRoutes');
app.use('/api/loans', loanRoute);
const loanLedgerRoute = require('./routes/loanLedgerRoutes');
app.use('/api/loansLedger', loanLedgerRoute);

//404 error page
app.use((err, req, res, next) => {
  console.log(`Error from server: ${err} ${req}`);
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

//Start the Server. Default port is 3000
const port = process.env.PORT || 3000;

//create the https server app and listen on the port
// app.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });

https.createServer(options, app).listen(port, () => {
  console.log(`Server running on https://localhost:${port}`)
});
