const mongoose = require('mongoose');

//Creating asynchronous DB connections with parameterized DB connection string
//connecting to Loans DB
const dbConnection_2 = mongoose.createConnection(`mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@${process.env.ATLAS_DBSERVER}/${process.env.LOANS_DATABASE}`
  , { useNewUrlParser: true, useUnifiedTopology: true })

//handle the connected event
dbConnection_2.on('connected', () => {
  console.log(`MongoDB connection succeeded with ${process.env.LOANS_DATABASE}...`);
});

//handle the error event  
dbConnection_2.on('error', console.error.bind(console, 'Connection error:'));

//handle the disconnected event
dbConnection_2.on('disconnected', () => {
  console.log(`MongoDB connection got disconnected with ${process.env.LOANS_DATABASE}...`);
});

//handle the SIGINT signal (e.g. Ctrl-C) to gracefully close the connection
process.on('SIGINT', async () => {
  try {
    await dbConnection_2.close();
    console.log(`MongoDB connection closed with ${process.env.LOANS_DATABASE}...`);
    process.exit(0);
  } catch (err) {
    console.error(`MongoDB ${process.env.LOANS_DATABASE} connection close error:`, err);
    process.exit(1);
  }
});

module.exports = dbConnection_2;
