const mysql = require('mysql');

let connection;

function handleDisconnect() {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root', // Cambia esto si es necesario
        password: '', // Cambia esto si tienes contraseña
        database: 'empresas' // Nombre de tu base de datos
    });

    connection.connect(err => {
        if (err) {
            console.error('Error conectando: ' + err);
            setTimeout(handleDisconnect, 2000); // Reintentar conexión después de 2 segundos
        } else {
            console.log('Conectado a la base de datos como id ' + connection.threadId);
        }
    });

    connection.on('error', err => {
        console.log('Error en la conexión: ' + err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect(); // Reconectar si la conexión se pierde
        } else {
            throw err;
        }
    });
}

handleDisconnect(); // Inicializa la conexión

module.exports = connection; // Exporta la conexión
