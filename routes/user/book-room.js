const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const sqlite3 = require('sqlite3').verbose();

// the 'book-room' route should be connected to the angular front-end

let database = new sqlite3.Database('./database/BookingDB.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.error(err.message);
});

// to be connected to the front-end
database.serialize(() => {   
      router.get('/user/book-room', (req, res, next) =>{ 
        database.run(`INSERT INTO users VALUES ( 
          name, lastname, phone, email)`, 
          [
            req.body.name,
            req.body.lastname,
            req.body.phone,
            req.body.email
          ], (err) => {
            if (err) console.error(err.message);              
          res.send("The data should be entered from the front-end to book a room.");
      });
  }); 
});

database.close((err)=> {
  if (err) console.error(err.message);
});

module.exports = router;