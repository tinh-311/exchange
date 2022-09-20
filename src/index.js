const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./events');

const connection = mysql.createConnection({
  host: '103.97.126.19',
  user: 'klpkxber_timmoDB',
  password: 'eZYimLBX',
  port: '3306',
  database: 'klpkxber_exchangerate'
});

// MCYJCHwfu(nk/uSZ

connection.connect((err) => {
  if(err) {
    console.log(err);
  }
  else {
    console.log('Connect DB successfully');
  }
});

const port = 8080;

const app = express()
.use(cors())
.use(bodyParser.json())
.use(events(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
