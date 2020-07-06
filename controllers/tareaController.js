const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const {validationResult} = require ('express-validator');
const jwt = require ('jsonwebtoken'); 

exports.crearTarea = async (req, res) => {

    //revisar si hay errores
   const errores = validationResult(req);
    if (!errores.isEmpty()){
        return res.status(400).json({errores : errores.array()})
    }
    
    
    try{
        //Extraer el proyecto 
        const {proyecto} = req.body;
        
        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto){
            return res.status(404).josn({msg : 'Proyecto no encontrado'})
        }
        console.log(existeProyecto);

        //verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }
        

       //crear un nuevo proyecto 
        const tarea= new Tarea(req.body);

        //guardamos el proyecto
        await tarea.save();
        res.json({tarea});
        
    }catch (error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//obtiene todos los proyectos del usuario actual
exports.obtenerTareas = async (req, res) =>{
    try{
        //Extraer el proyecto 
        const {proyecto} = req.query;
        
        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto){
            return res.status(404).josn({msg : 'Proyecto no encontrado'})
        }

        //verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }

        const tareas = await Tarea.find({proyecto}).sort({creado: -1});
        res.json({tareas});
    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//actualiza proyectos
exports.actualizarTarea = async (req, res) =>{

    try{
        //extraer la informacion del proyecto
        const {nombre, proyecto, estado} = req.body;

        //revisar el id
        let tarea = await Tarea.findById(req.params.id);

        //si el proyecto existe o no 
        if (!tarea){
            return res.status(404).json({msg: 'Tarea no encontrado'});
        }
        
        //verificar si existe el proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto){
            return res.status(404).josn({msg : 'Proyecto no encontrado'})
        }

        //verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }
        //Crear un objeto con la nueva informacion 
        const nuevoTarea = {};
        nuevoTarea.nombre=nombre;
        nuevoTarea.estado=estado;
        
        //verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        } 

        //actualizar
        tarea = await Tarea.findByIdAndUpdate({_id: req.params.id}, { $set : nuevoTarea}, {new: true});

        res.json({tarea});

    }catch(error){
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

//eliminar un proyecto por su id
exports.eliminarTarea = async (req, res) =>{
    
    try{
        //extraer la informacion del proyecto
        const {proyecto} = req.query; // si lo pasamos desde el front como params tiene que ser query en vez de body

        //revisar el id
        let tarea = await Tarea.findById(req.params.id);

        //si el proyecto existe o no 
        if (!tarea){
            return res.status(404).json({msg: 'Tarea no encontrado'});
        }
        
        //verificar si existe el proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto){
            return res.status(404).josn({msg : 'Proyecto no encontrado'})
        }

        //verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }
        
        //verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        } 

        //Eliminar el proyecto
        await Tarea.findOneAndRemove({ _id : req.params.id});
        res.json({msg: 'Tarea eliminada'});
    }catch(error){
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
} 