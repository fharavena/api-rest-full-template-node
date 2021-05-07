"use strict";

var pool = require('../config');

var controller = {
    // Get all beers
    get: (req, res) => {
        pool.getConnection((err, connection) => {
            if (err) {                
                res.status(301).send("error de conexion base de datos");
                return 0;
            }
            let query = 'SELECT * from beers';
            connection.query(query, (err, rows) => {
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
    // get beers by id
    getById: (req, res) => {
        pool.getConnection((err, connection) => {
            if (err) throw err
            connection.query('SELECT * from beers WHERE id = ?', [req.params.id], (err, rows) => {
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
    delete: (req, res) => {
        pool.getConnection((err, connection) => {
            if (err) throw err
            connection.query('DELETE from beers WHERE id = ?', [req.params.id], (err, rows) => {
                connection.release()
                if (!err) {
                    if (rows.affectedRows == 0) {
                        res.status(204).send();
                    } else {
                        res.send(`row with the Record ID: ${[req.params.id]} has been removed.`)
                    }
                } else {
                    console.log(err);
                }
            })
        })
    },
    // // Add a record
    add: (req, res) => {
        pool.getConnection((err, connection) => {
            if (err) throw err
            const params = req.body;

            connection.query('INSERT into beers SET ?', params, (err, rows) => {
                connection.release()

                if (!err) {
                    res.send(`row with the Record name: ${params.name} has been added.`)
                } else {
                    console.log(err);
                }
            })
        })
    },
    // // Update a record
    update: (req, res) => {
        pool.getConnection((err, connection) => {
            if (err) throw err
            const {
                id,
                name,
                tagline,
                description,
                image
            } = req.body

            connection.query('UPDATE beers SET name = ?,tagline = ?,description = ?, image=? WHERE id = ?', [name, tagline, description, image, id], (err, rows) => {
                connection.release()

                if (!err) {
                    res.send(`row with the Record name: ${name} has been update.`)
                } else {
                    console.log(err);
                }
            })
        })
    }
}

module.exports = controller;