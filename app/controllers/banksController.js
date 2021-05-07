"use strict";

var request = require('request');
var pool = require('../config');

var controller = {
  getBanks: (req, res) => {
    var options = {
      'method': 'GET',
      'url': 'https://bast.dev/api/banks.php',
      'headers': {}
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      res.status(200).send({
        "status": "success",
        "code": 200,
        "data": JSON.parse(response.body)['banks']
      });
    });
  },
  getBanksById: (req, res) => {
    var options = {
      'method': 'GET',
      'url': 'https://bast.dev/api/banks.php',
      'headers': {}
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      var banks = JSON.parse(response.body)['banks']
      var found = false;

      banks.forEach(element => {
        if (parseInt(element.id) == req.params.id) {
          found = true;
          res.status(200).send({
            "status": "success",
            "code": 200,
            "data": element
          });
        }
      })
      if (!found) {
        res.status(400).send({
          "status": "error",
          "code": 400,
          "data": "not found"
        });
      }
    });
  },
  async getBanksByIdInternal(req, res) {
    var options = {
      'method': 'GET',
      'url': 'https://bast.dev/api/banks.php',
      'headers': {}
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      var banks = JSON.parse(response.body)['banks']
      var salida;

      banks.forEach(element => {
        if (parseInt(element.id) == req.params.id) {
          return element;
        }
      })
      if (!found) {
        return undefined;
      }
    });
  },
  getTransfer: (req, res) => {
    pool.getConnection((err, connection) => {      
      if (err) {
        res.status(301).send("error de conexion base de datos");
        return 0;
      }
      let query = 'SELECT * from tipo_cuenta';
      try {
        connection.query(query, (err, rows) => {
          connection.release()
          if (!err) {
            if (!rows.length) {
              res.status(204).send();
            } else {
              // res.status(200).send(rows)
              res.status(200).send({
                "status": "success",
                "code": 200,
                "data": rows
              })
            }
          } else {
            res.status(200).send({
              "status": "error",
              "code": 300,
              "data": err
            });
          }
        })
      } catch (error) {
        res.status(200).send({
          "status": "error",
          "code": 300,
          "data": err
        });
      }

    })

  }
}

module.exports = controller;