const express = require('express');
const router = express.Router();
const db = require('../db'); // Importa la conexión desde db.js

// Ruta para obtener todas las sucursales
router.get('/', (req, res) => {
    db.query('SELECT * FROM inv_sucursales', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Ruta para crear una nueva sucursal
router.post('/', (req, res) => {
    const { idSucursal, idEmpresa, descripcion, direccion, telefono, encargado, estado } = req.body;

    const query = 'INSERT INTO inv_sucursales (idSucursal, idEmpresa, descripcion, direccion, telefono, encargado, estado) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [idSucursal, idEmpresa, descripcion, direccion, telefono, encargado, estado], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({ id: results.insertId, ...req.body });
    });
});

// Otras rutas para actualizar y eliminar sucursales...

module.exports = router;
