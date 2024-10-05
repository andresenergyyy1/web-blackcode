const express = require('express');
const bodyParser = require('body-parser');
const empresasRoutes = require('./routes/empresas');
const sucursalesRoutes = require('./routes/sucursales');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Para servir archivos estáticos

app.use('/api/empresas', empresasRoutes);
app.use('/api/sucursales', sucursalesRoutes);

// Ruta para servir el HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'crud.html')); // Asegúrate de que crud.html esté en la carpeta public
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
