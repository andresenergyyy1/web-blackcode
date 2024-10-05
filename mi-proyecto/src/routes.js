const express = require('express');
const router = express.Router();
const connection = require('./db');

// CRUD para gen_empresas

// Crear empresa
router.post('/empresas', (req, res) => {
    const { idEmpresa, nombre, direccion, direccionfacturacion, representantelegal, telefono, correoelectronico, codigopostal, estado, principal, adiciono } = req.body;
    const sql = 'INSERT INTO gen_empresas SET ?';
    const values = { idEmpresa, nombre, direccion, direccionfacturacion, representantelegal, telefono, correoelectronico, codigopostal, estado, principal, adiciono };
    
    connection.query(sql, values, (error, results) => {
        if (error) return res.status(500).json({ error });
        res.status(201).json({ message: 'Empresa creada', data: results });
    });
});

// Obtener todas las empresas
router.get('/empresas', (req, res) => {
    const sql = 'SELECT * FROM gen_empresas';
    connection.query(sql, (error, results) => {
        if (error) return res.status(500).json({ error });
        res.status(200).json(results);
    });
});

// Actualizar empresa
router.put('/empresas/:id', (req, res) => {
    const sql = 'UPDATE gen_empresas SET ? WHERE idEmpresa = ?';
    connection.query(sql, [req.body, req.params.id], (error, results) => {
        if (error) return res.status(500).json({ error });
        res.status(200).json({ message: 'Empresa actualizada', data: results });
    });
});

// Eliminar empresa
router.delete('/empresas/:id', (req, res) => {
    const sql = 'DELETE FROM gen_empresas WHERE idEmpresa = ?';
    connection.query(sql, req.params.id, (error, results) => {
        if (error) return res.status(500).json({ error });
        res.status(200).json({ message: 'Empresa eliminada', data: results });
    });
});

// CRUD para inv_sucursales

// Crear sucursal
router.post('/sucursales', (req, res) => {
    const { idSucursal, idEmpresa, descripcion, direccion, telefono, encargado, estado } = req.body;
    const sql = 'INSERT INTO inv_sucursales SET ?';
    const values = { idSucursal, idEmpresa, descripcion, direccion, telefono, encargado, estado };

    connection.query(sql, values, (error, results) => {
        if (error) return res.status(500).json({ error });
        res.status(201).json({ message: 'Sucursal creada', data: results });
    });
});

// Obtener todas las sucursales
router.get('/sucursales', (req, res) => {
    const sql = 'SELECT * FROM inv_sucursales';
    connection.query(sql, (error, results) => {
        if (error) return res.status(500).json({ error });
        res.status(200).json(results);
    });
});

// Actualizar sucursal
router.put('/sucursales/:id', (req, res) => {
    const sql = 'UPDATE inv_sucursales SET ? WHERE idSucursal = ?';
    connection.query(sql, [req.body, req.params.id], (error, results) => {
        if (error) return res.status(500).json({ error });
        res.status(200).json({ message: 'Sucursal actualizada', data: results });
    });
});

// Eliminar sucursal
router.delete('/sucursales/:id', (req, res) => {
    const sql = 'DELETE FROM inv_sucursales WHERE idSucursal = ?';
    connection.query(sql, req.params.id, (error, results) => {
        if (error) return res.status(500).json({ error });
        res.status(200).json({ message: 'Sucursal eliminada', data: results });
    });
});

module.exports = router;
