const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();

let database = new sqlite3.Database('./database/BookingDB.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.error(err.message);
});

// query here the list of room for createdBy=1
database.serialize( () =>{
  database.all(`SELECT *
           FROM rooms 
           WHERE createdBy = 1`, (err, row) =>{
      if (err) {
          console.error(err.message);
      }      
      router.get('/admin/list-room', (req, res, next) => {           
        res.send(row);
      });
  }); 
});

database.close( (err) => {
  if (err) console.error(err.message);
});

module.exports = router; 