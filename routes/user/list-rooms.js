const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();

let database = new sqlite3.Database('./database/BookingDB.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.error(err.message);
});

//query only those with active=true AND order by created and available
database.serialize( () =>{
  database.all(`SELECT *
           FROM rooms
           ORDER BY created AND available`, (err, row) => {
      if (err) console.error(err.message);      
      router.get('/user/list-rooms', (req, res, next) => {        
          res.send(row);
      });
  }); 
});

database.close( (err) => {
  if (err) console.error(err.message); 
});

module.exports = router;