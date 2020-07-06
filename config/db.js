const moongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

const conectarDB = async () => {
    try{
        await moongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('DB Conectada');
    } catch(error){
        console.log(error);//
        process.exit(1);// si hay un error en la app la detiene
    }
}

module.exports = conectarDB;