var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();

var database = new sqlite3.Database('./database/BookingDB.db', sqlite3.OPEN_READWRITE, function(err) {
  if (err) {
    console.error(err.message);
  }
});

//query only those with active=true AND order by created and available
database.serialize(function() {
  database.all(`SELECT *
           FROM rooms
           ORDER BY created AND available`, function(err, row){
      if (err) {
          console.error(err.message);
      }      
      router.get('/user/list-rooms', function(req, res, next) {        
          res.send(row);
      });
  }); 
});

database.close(function (err) {
  if (err) {
    console.error(err.message);
  }
});

module.exports = router;