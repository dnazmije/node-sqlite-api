var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();

var database = new sqlite3.Database('./database/BookingDB.db', sqlite3.OPEN_READWRITE, function(err) {
  if (err) {
    console.error(err.message);
  }
});

// query here the list of room for createdBy=1
database.serialize(function() {
  database.all(`SELECT *
           FROM rooms 
           WHERE createdBy = 1`, function(err, row){
      if (err) {
          console.error(err.message);
      }      
      router.get('/admin/list-room', function(req, res, next) {           
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