const { getAllUsers, addUser, deleteAllUsers, escapeHtmlText } = require("../models/users"); // Importar las funciones de users.js

const express = require("express");
const router = express.Router();

// Endpoint para obtener todos los usuarios
// El método get se utiliza para obtener datos del servidor
// En este caso, se obtienen todos los usuarios de la base de datos
// La función getAllUsers se encarga de ejecutar la consulta SQL y devolver todos los usuarios
// La respuesta se envía en formato JSON
router.get("/users", (req, res) => {
    const users = getAllUsers();
    const format = escapeHtmlText(req.query.format);

    if (format === "list") {
        const listHTML = users.map(user => `<li>${user.nombre}</li>`).join("");
        res.send(`<ul>${listHTML}</ul>`);
    } else if (format === "table") {
        const tableHTML = `
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Contraseña</th>
                    </tr>
                </thead>
                <tbody>
                    ${users.map(user => `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.nombre}</td>
                            <td>${user.pass}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;
        res.send(tableHTML);
    } else if (format === "json") {
        res.json(users);
    } else {
        res.status(400).send("Formato no soportado");
    }
});

// Endpoint para añadir un usuario
// El método post se utiliza para enviar datos al servidor
// En este caso, se envían los datos del nuevo usuario
// El cuerpo de la petición debe contener los datos del nuevo usuario
router.post("/users", (req, res) => {
    const nombre = req.body.nombre;
    const pass = req.body.pass;
    addUser(nombre, pass);
    res.send("Usuario añadido correctamente");
});

// Endpoint para eliminar todos los usuarios
router.delete("/users", (req, res) => {
    deleteAllUsers();
    res.send("Todos los usuarios han sido eliminados");
});

module.exports = router;