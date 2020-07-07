const express = require('express');
const conectarDB = require ('./config/db');

const cors = require('cors');

//Crear el servidor de express
const app = express();

//Conectar a la bbdd
conectarDB();

//habilitar corse
app.use(cors());

//habilitar express.json
app.use(express.json({extended: true}));

//puerto de la app
const port = process.env.PORT || 4000;

// importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));


//Arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})