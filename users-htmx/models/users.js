const betterSqlite3 = require('better-sqlite3');
const fs = require('fs'); //Encontrar archivos fuera de la carpeta
const { get } = require('http');
const path = require('path'); //Resolver rutas

const initSQL = fs.readFileSync(path.join(__dirname, '../init.sql'), 'utf8'); 

// Si no existe la base de datos, la crea
if(!fs.existsSync(path.join(__dirname, '../users.db'))){
    console.log('La base de datos no existe, creando...');
    // Crear la base de datos y ejecutar el script SQL
    const db = betterSqlite3(path.join(__dirname, '../users.db')) // Esta constante db, solo existe dentro de este bloque
    db.exec(initSQL);
    db.close();
} 

const db = betterSqlite3(path.join(__dirname, '../users.db'));

// Función para obtener todos los usuarios
const getAllUsers = () => {
    const query = db.prepare('SELECT * FROM usuarios');
    const users = query.all();
    return users;
}

// Funcion para añadir un usuario
const addUser = (nombre, pass) => {
    const query = db.prepare('INSERT INTO usuarios (nombre, pass) VALUES (?, ?)');
    const result = query.run(nombre, pass);
    return "Usuario añadido correctamente";
}

//Funcion para eliminar todos los usuarios
const deleteAllUsers = () => {
    const query = db.prepare('DELETE FROM usuarios');
    query.run();
    return "Todos los usuarios han sido eliminados";
}

// El módulo exports es un objeto que se puede usar para exportar funciones, objetos o variables
module.exports = {
    getAllUsers,
    addUser,
    deleteAllUsers
}
