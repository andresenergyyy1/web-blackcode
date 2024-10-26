const express = require('express');
const router = express.Router();
const db = require('../config/db');
const path = require('path');

/*// Redirigir a /login al acceder a la raíz
router.get('/', (req, res) => {
    res.redirect('/login');
});

// Ruta para mostrar el formulario de login
router.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// Ruta para manejar el inicio de sesión
router.post('/login', (req, res) => {
    const { nombre_empleado, contraseña_empleado } = req.body;
    console.log(`Usuario: ${nombre_empleado}, Contraseña: ${contraseña_empleado}`);

    db.query('SELECT * FROM Empleados WHERE nombre_empleado = ? AND contraseña_empleado = ?', 
    [nombre_empleado, contraseña_empleado], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).send('Error en la conexión a la base de datos');
        }
        if (results.length > 0) {
            req.session.usuario = results[0];
            return res.redirect('/index');
        }
        res.render('login', { error: 'Usuario o contraseña incorrectos' });
    });
});

// Ruta para mostrar el índice después de iniciar sesión
router.get('/index', (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/login');
    }
    // Uso de rutas generales aquí
});
*/

// LOGIN  \\
router.post('/login', (req, res) => {
    const { correo_empleado, contrasenhia_empleado } = req.body;

    // Suponiendo que verificas las credenciales aquí
    const query = 'SELECT * FROM Empleados WHERE correo_empleado = ? AND contrasenhia_empleado = ?';
    
    db.query(query, [correo_empleado, contrasenhia_empleado], (error, results) => {
        if (error || results.length === 0) {
            res.send('<script>alert("Fallo al iniciar sesión"); window.location.href = "/login.html";</script>');
        } else {
            // Aquí asumiendo que el primer resultado es el usuario que inició sesión
            const usuario = results[0];
            req.session.nombre_empleado = usuario.nombre_empleado; // Almacenar en la sesión

            res.redirect('/html/inicio.html'); // Redirigir a la página de inicio
        }
    });
});


// REGISTRO EMPLEADO  \\
router.post('/register', (req, res) => {
    const { nombre_empleado, correo_empleado, contrasenhia_empleado, telefono_empleado } = req.body;

    // Consulta SQL para insertar un nuevo empleado
    const query = `INSERT INTO Empleados (nombre_empleado, correo_empleado, contrasenhia_empleado, telefono_empleado)
                   VALUES (?, ?, ?, ?)`;

    db.query(query, [nombre_empleado, correo_empleado, contrasenhia_empleado, telefono_empleado], (error, results) => {
        if (error) {
            console.error('Error al registrar el empleado:', error);
            res.send('<script>alert("Hubo un fallo al registrar el empleado"); window.location.href = "/register";</script>');
        } else {
            res.send('<script>alert("Empleado registrado con éxito"); window.location.href = "/login";</script>');
        }
    });
});


// ---------- grafica1 ---------- \\

// Ruta para obtener ventas mensuales
router.get('/graficos/ventas-mensuales', (req, res) => {
    const query = `
        SELECT DATE_FORMAT(fecha_hora, '%Y-%m') AS mes, SUM(dv.cantidad_vendida * p.precio_unitario) AS total_ventas
        FROM Ventas v
        JOIN Detalle_Venta dv ON v.venta_id = dv.venta_id
        JOIN Productos p ON dv.producto_id = p.producto_id
        GROUP BY mes
        ORDER BY mes;
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener ventas mensuales' });
        }
        res.json(results);
    });
});


// Nueva ruta para obtener estadísticas mensuales
// Nueva ruta para obtener impuestos mensuales
router.get('/graficos/impuestos-mensuales', (req, res) => {
    const query = `
        SELECT DATE_FORMAT(v.fecha_hora, '%Y-%m') AS mes, SUM(p.impuestos) AS total_impuestos
        FROM Ventas v
        JOIN Detalle_Venta dv ON v.venta_id = dv.venta_id
        JOIN Productos p ON dv.producto_id = p.producto_id
        GROUP BY mes
        ORDER BY mes;
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener impuestos mensuales' });
        }
        res.json(results);
    });
});

// Nueva ruta para obtener estadísticas mensuales
router.get('/graficos/estadisticas-mensuales', (req, res) => {
    const query = `
        SELECT 
            MONTH(fecha_hora) AS mes,
            SUM(dv.cantidad_vendida * p.precio_unitario) AS total_ventas,
            SUM(p.impuestos) AS total_impuestos,
            (SELECT p.descripcion FROM Detalle_Venta dv JOIN Productos p ON dv.producto_id = p.producto_id
             GROUP BY dv.producto_id ORDER BY SUM(dv.cantidad_vendida) DESC LIMIT 1) AS objeto_mas_vendido
        FROM Ventas v
        JOIN Detalle_Venta dv ON v.venta_id = dv.venta_id
        JOIN Productos p ON dv.producto_id = p.producto_id
        GROUP BY mes
        ORDER BY mes;
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener estadísticas' });
        }

        // Calcula el mes con mayor ventas
        const mesConMayorVentas = results.reduce((prev, curr) => (prev.total_ventas > curr.total_ventas ? prev : curr));
        
        res.json({
            mes_con_mayor_ventas: mesConMayorVentas.mes,
            max_ventas: mesConMayorVentas.total_ventas,
            objeto_mas_vendido: results[0].objeto_mas_vendido,
            total_impuestos: results.reduce((acc, curr) => acc + curr.total_impuestos, 0) // Suma total de impuestos
        });
    });
});




// ---------- CLIENTES ---------- \\

// Ruta para servir el archivo HTML de registro de clientes
router.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/registro.html'));
});
// Ruta para obtener todos los clientes
router.get('/clientes', (req, res) => {
    const query = `SELECT * FROM Clientes`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener clientes' });
        }
        res.json(results);
    });
});

// Ruta para agregar un nuevo cliente
router.post('/clientes', (req, res) => {
    const { nombre, direccion, telefono, correo, sexo, NIT, CUI, seguro_medico, numero_poliza } = req.body;
    const query = `INSERT INTO Clientes (nombre, direccion, telefono, correo, sexo, NIT, CUI, seguro_medico, numero_poliza) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [nombre, direccion, telefono, correo, sexo, NIT, CUI, seguro_medico, numero_poliza];

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al agregar cliente' });
        }
        res.status(201).json({ id: results.insertId, nombre, direccion, telefono, correo, sexo, NIT, CUI, seguro_medico, numero_poliza });
    });
});

// Ruta para obtener un cliente específico
router.get('/clientes/:cui', (req, res) => {
    const { cui } = req.params;
    const query = `SELECT * FROM Clientes WHERE CUI = ?`;
    db.query(query, [cui], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener cliente' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(results[0]);
    });
});

// Ruta para actualizar un cliente
router.put('/clientes/:cui', (req, res) => {
    const { cui } = req.params;
    const { nombre, direccion, telefono, correo, sexo, NIT, seguro_medico, numero_poliza } = req.body;

    const query = `UPDATE Clientes SET nombre = ?, direccion = ?, telefono = ?, correo = ?, sexo = ?, NIT = ?, seguro_medico = ?, numero_poliza = ? WHERE CUI = ?`;
    const values = [nombre, direccion, telefono, correo, sexo, NIT, seguro_medico, numero_poliza, cui];

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar cliente' });
        }
        res.json({ success: true, message: 'Cliente actualizado correctamente' });
    });
});

// Ruta para eliminar un cliente
router.delete('/clientes/:cui', (req, res) => {
    const { cui } = req.params;

    const query = `DELETE FROM Clientes WHERE CUI = ?`;
    db.query(query, [cui], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar cliente' });
        }
        res.json({ success: true, message: 'Cliente eliminado correctamente' });
    });
});



// ---------- PRODUCTOS ---------- \\

// Ruta para servir el archivo HTML de registro de productos
router.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/Productos.html'));
});

// Ruta para obtener todos los productos
router.get('/productos', (req, res) => {
    const query = `SELECT * FROM Productos`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener productos' });
        }
        res.json(results);
    });
});

// Ruta para agregar un nuevo producto
router.post('/productos', (req, res) => {
    const { codigo_producto, numero_serie, precio_unitario, categoria_id, descripcion, impuestos } = req.body;
    const query = `INSERT INTO Productos (codigo_producto, numero_serie, precio_unitario, categoria_id, descripcion, impuestos) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [codigo_producto, numero_serie, precio_unitario, categoria_id, descripcion, impuestos];

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al agregar producto' });
        }
        res.status(201).json({ producto_id: results.insertId, codigo_producto, numero_serie, precio_unitario, categoria_id, descripcion, impuestos });
    });
});

// Ruta para obtener un producto específico
router.get('/productos/:producto_id', (req, res) => {
    const { producto_id } = req.params;
    const query = `SELECT * FROM Productos WHERE producto_id = ?`;
    db.query(query, [producto_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener producto' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(results[0]);
    });
});

// Ruta para actualizar un producto
router.put('/productos/:producto_id', (req, res) => {
    const { producto_id } = req.params;
    const { codigo_producto, numero_serie, precio_unitario, categoria_id, descripcion, impuestos } = req.body;

    const query = `UPDATE Productos SET codigo_producto = ?, numero_serie = ?, precio_unitario = ?, categoria_id = ?, descripcion = ?, impuestos = ? WHERE producto_id = ?`;
    const values = [codigo_producto, numero_serie, precio_unitario, categoria_id, descripcion, impuestos, producto_id];

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar producto' });
        }
        res.json({ success: true, message: 'Producto actualizado correctamente' });
    });
});

// Ruta para eliminar un producto
router.delete('/productos/:producto_id', (req, res) => {
    const { producto_id } = req.params;

    const query = `DELETE FROM Productos WHERE producto_id = ?`;
    db.query(query, [producto_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar producto' });
        }
        res.json({ success: true, message: 'Producto eliminado correctamente' });
    });
});


// ---------- DEVOLUCIONES ---------- \\

router.get('/devoluciones', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/devoluciones.html')); // Ruta hacia tu archivo HTML
});

router.post('/devoluciones', (req, res) => {
    const { venta_id, fecha, motivo, producto_id } = req.body;

    const sql = `INSERT INTO Devoluciones (venta_id, fecha, motivo, producto_id) 
                 VALUES (?, ?, ?, ?)`;

    db.query(sql, [venta_id, fecha, motivo, producto_id], (err) => {
        if (err) {
            console.error('Error al registrar la devolución:', err);
            res.status(500).send('Error en el servidor');
        } else {
            console.log('Devolución registrada exitosamente:');
            res.send('Devolución registrada con éxito');
        }
    });
});

// ---------- REPORTES ---------- \\

router.get('/reportes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/reportes.html'));
});

router.post('/filtrarVentas', (req, res) => {
    const { startDate, endDate } = req.body;
    const query = `
        SELECT v.venta_id, p.codigo_producto, dv.cantidad_vendida, v.fecha_hora
        FROM Ventas v
        JOIN Detalle_Venta dv ON v.venta_id = dv.venta_id
        JOIN Productos p ON dv.producto_id = p.producto_id
        WHERE v.fecha_hora BETWEEN ? AND ?
    `;
    db.query(query, [startDate, endDate], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

module.exports = router;
