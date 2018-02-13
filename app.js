'use strict';

const port = 8080;

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use('/', express.static('./public'));

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'orientation_retake',
});

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

conn.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected to mySQL!');
  }
});

app.get('/users', function (req, res) {
  conn.query('SELECT * FROM users', function (err, rows) {
    if (err) {
      throw err;
    } else {
      res.json(rows);
    }
  })
})

app.get('/tickets', function (req, res) {
  conn.query('SELECT * FROM tickets', function (err, rows) {
    if (err) {
      throw err;
    } else {
      res.json(rows);
    }
  })
})

app.post('/tickets', function (req, res) {
  conn.query(`INSERT INTO tickets SET ?`, [req.body], function (err, packet) {
    if (err) {
      res.sendStatus(500);
      throw err;
    } else {
      res.json(packet);
      console.log('Successful insert')
    }
  })
})

app.delete('/tickets/:id', function (req, res) {
  conn.query(`DELETE FROM tickets WHERE id=?;`, [req.params.id], function (err, packet) {
    if (err) {
      throw err;
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  }) 
})

app.listen(port, () => {
  console.log(`the app is running on ${port}`);
});