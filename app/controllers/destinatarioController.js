"use strict";
var pool = require('../config');
var bankControllerd = require("./banksController");

var controller = {
    add: (req, res) => {
        pool.getConnection((err, connection) => {
            if (err) {
                res.status(301).send("error de conexion base de datos");
                return 0;
            }
            const params = req.body;

            connection.query('INSERT into destinatario SET ?', params, (err, rows) => {
                connection.release()

                if (!err) {
                    res.status(200).send({
                        "status": "success",
                        "code": 200,
                        "msg": "Destinatario agregado satisfactoriamente"
                    })
                } else {
                    if (err.code == 'ER_DUP_ENTRY') {

                        res.status(300).send({
                            "status": "error",
                            "code": 300,
                            "msg": "Destinatario ya ha sido agregado anteriormente"
                        })
                        throw err;
                    } else {
                        res.status(300).send({
                            "status": "error",
                            "code": 300,
                            "msg": "Error en consulta SQL"
                        })
                    }
                }
            })
        })
    },
    // get User by Name
    getByName: (req, res) => {
        pool.getConnection((err, connection) => {
            if (err) throw err
            connection.query('SELECT * from destinatario WHERE nombre like ? LIMIT 5', ['%'+req.params.name+'%'], (err, rows) => {
                connection.release()
                if (!err) {
                    if (!rows.length) {
                        res.status(204).send();
                    } else {
                        res.status(200).send(rows)
                    }
                } else {
                    console.log(err);
                }
            })
        })
    },
}

module.exports = controller;