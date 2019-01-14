var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var sqlite3 = require('sqlite3').verbose();

// the 'book-room' route should be connected to the angular front-end

var database = new sqlite3.Database('./database/BookingDB.db', sqlite3.OPEN_READWRITE, function(err) {
  if (err) {
    console.error(err.message);
  }
});

// to be connected to the front-end
database.serialize(function() {   
      router.get('/user/book-room', function(req, res, next) { 
        database.run(`INSERT INTO users VALUES ( 
          roomID, name, lastname, phone, email)`, 
          [
            req.body.roomID,
            req.body.name,
            req.body.lastname,
            req.body.phone,
            req.body.email
          ], function(err){
          if (err) {
              console.error(err.message);
          }             
          res.send("The data should be entered from the front-end to book a room.");
      });
  }); 
});

database.close(function (err) {
  if (err) {
    console.error(err.message);
  }
});

module.exports = router;