//rutas para crear usuarios
const express = require('express');
const router = express.Router();
const tareaController = require ('../controllers/tareaController');
const {check} = require('express-validator');
const auth = require ('../middleware/auth');

//api/tareas
//inserta un tarea
router.post('/', 
    auth,
    [
       check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
       check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);
//Trae todos los proyectos por id de usuario
router.get('/', 
    auth,
    tareaController.obtenerTareas 
);

//Actualiza tareas
router.put('/:id', 
    auth,
    tareaController.actualizarTarea 
);

//Eliminar proyectos
router.delete('/:id', 
    auth,
    tareaController.eliminarTarea
); 

module.exports = router;