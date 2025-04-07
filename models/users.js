const betterSqlite3 = require('better-sqlite3');
const fs = require ('fs');
const path = require('path');

const initSQL = fs.readFileSync(path.join(__dirname, '../init.sql'), 'utf-8'); 
if(fs.existsSync(path.join(__dirname, '../users.db'))){
    console.log("La base de datos existe");
}

if(!fs.existsSync(path.join(__dirname, '../users.db'))){
    console.log("La base de NO datos existe, ejecutando sql...")
    const db = betterSqlite3(path.join(__dirname, '../users.db'))
    db.exec(initSQL);
    db.close();
}

const db = betterSqlite3(path.join(__dirname, '../users.db'))

const getAllUsers = () =>{
    const stmt = db.prepare('SELECT * FROM usuarios');
    const rows = stmt.all();
    return rows;
}

const addUser = (nombre, pass) =>{
    const stmt = db.prepare('INSERT INTO usuarios (nombre, pass) VALUES (?, ?)');
    const info = stmt.run(nombre, pass);
    return "Usuario Añadido";
}


module.exports = {
    getAllUsers,
    addUser
}