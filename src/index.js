const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./events');

const connection = mysql.createConnection({
  host: '103.97.126.19',
  user: 'xvugyjuh_timmo',
  password: 'Zo1lDUQCsx',
  port: '3306',
  database: 'xvugyjuh_exchangeRate'
});

connection.connect((err) => {
  if(err) {
    console.log(err);
  }
  else {
    console.log('Database connect successfully');
  }
});

const port = process.env.PORT || 8080;

const app = express()
.use(cors())
.use(bodyParser.json())
.use(events(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
