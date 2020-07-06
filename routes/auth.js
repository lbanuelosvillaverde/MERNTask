//rutas para autentificar usuario
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');
const auth = require ('../middleware/auth');
//Crear un usario
//api/auth
router.post('/', 
    authController.autentificarUsuario
);

//obtiene el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
)

module.exports = router;