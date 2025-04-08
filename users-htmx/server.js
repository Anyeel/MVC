const {getAllUsers, addUser} = require("./models/users"); // Importar las funciones de users.js

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const usersRouter = require("./routes/users"); // Importar el router de usuarios
app.use(usersRouter); // Usar el router de usuarios

app.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000");
});