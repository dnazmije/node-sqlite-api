const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();

// open booking database
let database = new sqlite3.Database('./database/BookingDB.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.error(err.message);
    console.log('Connected to the BookingDB database.');
});

// retrive the data
// **SQLite console gave error on FULL OUTER JOIN and RIGH JOIN
// query here the bookings 
database.serialize( () => {
    database.all(`SELECT roomID, title, description, active, available, createdBy
            FROM rooms
            LEFT JOIN users
            ON rooms.createdBy = users.userID 
            WHERE available = false
            `, (err, row) => {
        if (err) {
            console.error(err.message);
        }      
        router.get('/admin/list-bookings', (req, res, next) => {
            res.send(row);
        });

    });
  });

// close database
database.close((err) => {
    if (err) console.error(err.message);
    console.log('Database connection closed.');
});

module.exports = router;
