var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();

// open booking database
var database = new sqlite3.Database('./database/BookingDB.db', sqlite3.OPEN_READWRITE, function(err) {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the BookingDB database.');
});

// retrive the data
// **SQLite console gave error on FULL OUTER JOIN and RIGH JOIN
// query here the bookings of user with userID=1
database.serialize(function() {
    database.all(`SELECT roomID, title, description, active, available, createdBy
            FROM rooms
            LEFT JOIN users
            ON rooms.createdBy = users.userID 
            WHERE available = false
            `, function(err, row){
        if (err) {
            console.error(err.message);
        }      
        router.get('/admin/list-bookings', function(req, res, next) {
            res.send(row);
        });

    });
  });

// close database
database.close(function (err) {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
});

module.exports = router;
