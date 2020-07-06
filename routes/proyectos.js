//rutas para crear usuarios
const express = require('express');
const router = express.Router();
const proyectoController = require ('../controllers/proyectoController');
const {check} = require('express-validator');
const auth = require ('../middleware/auth');
//Crear un proyectos
//api/proyectos
//inserta un proyecto
router.post('/', 
    auth,
    [
       check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty(), 
    ],
    proyectoController.crearProyecto 
);
//Trae todos los proyectos por id de usuario
router.get('/', 
    auth,
    
    proyectoController.obtenerProyectos 
);
//Actualiza proyectos
router.put('/:id', 
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty(), 
    ],
    proyectoController.actualizarProyecto 
);
//Eliminar proyectos
router.delete('/:id', 
    auth,
    proyectoController.eliminarProyecto 
);

module.exports = router;