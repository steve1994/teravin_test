var express = require('express');
var router = express.Router();

/* GET users listing. */
module.exports = (pool) => {

    router.get('/', function(req, res) {
          let querySearch = req.query.search;
          let sqlSelect = 'SELECT * FROM users';
          if (querySearch != 'null') {
              sqlSelect += ` WHERE lower(nama) LIKE '%${querySearch.toLowerCase()}%'`;
          }
          pool.query(sqlSelect, function (err,response) {
              if (err) {
                  res.status(401).json({
                      status : 'failed',
                      error : err
                  })
              } else {
                  res.status(200).json({
                      status : 'success',
                      numData : response.rows.length,
                      data : response.rows
                  })
              }
          })
    });

    router.post('/add', function (req, res) {
        let {nama, hp, email, alamat} = req.body;
        let sqlInsert = 'INSERT INTO users(nama,hp,email,alamat) VALUES ($1, $2, $3, $4)'
        pool.query(sqlInsert, [nama,hp,email,alamat], function (err,response) {
            if (err) {
                res.status(401).json({
                    status : 'failed',
                    error : err
                })
            } else {
                res.status(200).json({
                    status : 'success',
                    userAdded : {nama,hp,email,alamat}
                })
            }
        })
    })

    return router;
}
