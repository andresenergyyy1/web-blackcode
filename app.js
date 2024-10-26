const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/routes'); // Asegúrate de que esta ruta es correcta

const app = express();

// Configuración de middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de sesiones
app.use(session({
    secret: 'tu_secreto', // Cambia esto por una cadena secreta
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambia a true si usas HTTPS
}));

// Configurar el motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Usar las rutas
app.use('/', routes); // Asegúrate de que 'routes' está definido correctamente

// Manejo de errores (opcional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// Redirigir a la página de login al iniciar
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Enviar la página de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/login.html')); // Usa path.join para una mejor portabilidad
});

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
