# MVC
- Modelo -> (Funciones/Clases || interactuar db)
- Vista -> (Como se ve)
- Controlador -> (Rutas que el usuario debe seguir)

## Creamos el SQL
```sql
CREATE TABLE IF NOT EXISTS usuarios(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL UNIQUE,
    pass TEST NOT NULL,
    APIKEY TEXT NOT NULL DEFAULT (hex(randomblob(16)))
);

INSERT INTO usuarios (nombre, pass) VALUES
('admin', 'admin'),
('user1','user1'),
('user2','user2');
```

 ## Creamos una nueva carpeta llamada models y metemos el js
```javascript
const betterSqlite3 = require('better-sqlite3');
const fs = require ('fs');
const path = require('path')

const initSQL = fs.readFileSync(path.join(__dirname, '../init.sql'), 'utf-8'); 
console.log(initSQL);
// Esto es para que navegue en las carpetas
```

## Ahora añadimos al users.js:
```javascript
if(fs.existsSync(path.join(__dirname, '../users.db'))){
    console.log("La base de datos existe");
}
// Esto es para averigar si la base de datos existe leyendo todos los archivos
```

## AHORA PARA SABER SI NO ESTÁ Y ADEMÁS PARA QUE INICIE EL SQL PARA QUE SE CREE LA BASE DE DATOS
```javascript
if(!fs.existsSync(path.join(__dirname, '../users.db'))){
    console.log("La base de NO datos existe, ejecutando sql...")
    const db = betterSqlite3(path.join(__dirname, '../users.db'))
    db.exec(initSQL);
    db.close();
}
```

## Ponemos esto fuera para acceder siempre que queramos a la base de datos:

```javascript
const db = betterSqlite3(path.join(__dirname, '../users.db'))
```

## Creamos las funciones:
```javascript
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

addUser("TEST", "TEST");
console.log(getAllUsers);
```

## PARA PODER USAR LAS FUNCIONES FUERA DE USERS.JS:
```javascript
module.exports = {
    getAllUsers,
    addUser
}
```

## Crear un server.js en la main:
```javascript
const {getAllUsers, addUser} = require("./models/users");

console.log(getAllUsers())
```

## Probamos si funciona:
```bash
node server.js
```

## Creamos los endpoints:
```javascript
const express = require('express')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(express.static('public'));

app.get("/users", (req, res) => {
    res.json(getAllUsers());
});

app.listen(3000, () => {
    console.log("Server en 3000");
})

console.log(getAllUsers())
```

## Hacer el post:
```javascript
app.post("/users", (req, res) => {
    const nombre = req.body.nombre;
    const pass = req.body.pass;
    addUser(nombre, pass);
    res.send("Usuario añadido")
});
```

## Hacemos una carpeta test con este sh:
```sh
curl -X POST localhost:3000/users \
-H "Content-Type: application/json" \
-d '{"nombre": "tu_nombre", "pass": "tu_caontraseña"}' \
```

## Creamos una nueva carpeta de router y creamor un users.js con esto:
```javascript
const {getAllUsers, addUser} = require("../models/users");

const express = require('express');
const router = express.Router();

app.get("/users", (req, res) => {
    res.json(getAllUsers());
});

app.post("/users", (req, res) => {
    const nombre = req.body.nombre;
    const pass = req.body.pass;
    addUser(nombre, pass);
    res.send("Usuario añadido")
});
//Esto lo cortamos de server.js
module.exports = router;
```

## Server.js se nod quedaría así:
```javascript
const {getAllUsers, addUser} = require("./models/users");
const express = require('express')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(express.static('public'));

const usersRouter = require("./routes/users")
app.use(usersRouter);

app.listen(3000, () => {
    console.log("Server en 3000");
})

console.log(getAllUsers())
```
