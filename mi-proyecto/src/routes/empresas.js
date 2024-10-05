const express = require('express');
const router = express.Router();
const db = require('../db'); // Importa la conexión desde db.js

// Ruta para obtener todas las empresas
router.get('/', (req, res) => {
    db.query('SELECT * FROM gen_empresas', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Ruta para obtener una empresa por ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM gen_empresas WHERE idEmpresa = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Empresa no encontrada' });
        res.status(200).json(results[0]);
    });
});

// Ruta para crear una nueva empresa
router.post('/', (req, res) => {
    const { idEmpresa, nombre, direccion, direccionfacturacion, representantelegal, telefono, correoelectronico, codigopostal, estado, principal, adiciono } = req.body;

    const query = 'INSERT INTO gen_empresas (idEmpresa, nombre, direccion, direccionfacturacion, representantelegal, telefono, correoelectronico, codigopostal, estado, principal, adiciono) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [idEmpresa, nombre, direccion, direccionfacturacion, representantelegal, telefono, correoelectronico, codigopostal, estado, principal, adiciono], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({ id: results.insertId, ...req.body });
    });
});

// Ruta para actualizar una empresa
router.put('/:id', (req, res) => {
    const { idEmpresa, nombre, direccion, direccionfacturacion, representantelegal, telefono, correoelectronico, codigopostal, estado, principal, adiciono } = req.body;

    const query = 'UPDATE gen_empresas SET nombre = ?, direccion = ?, direccionfacturacion = ?, representantelegal = ?, telefono = ?, correoelectronico = ?, codigopostal = ?, estado = ?, principal = ?, adiciono = ? WHERE idEmpresa = ?';
    db.query(query, [nombre, direccion, direccionfacturacion, representantelegal, telefono, correoelectronico, codigopostal, estado, principal, adiciono, req.params.id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ message: 'Empresa actualizada', id: req.params.id });
    });
});

// Ruta para eliminar una empresa
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM gen_empresas WHERE idEmpresa = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Empresa no encontrada' });
        res.status(200).json({ message: 'Empresa eliminada' });
    });
});

module.exports = router;
