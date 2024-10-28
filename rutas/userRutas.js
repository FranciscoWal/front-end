var ruta = require("express").Router();
var axios = require("axios");
ruta.get("/", async (req, res) => {
    res.render("login");
});
ruta.get("/tables", async (req, res) => {
    try {
        const us = await axios.get("http://localhost:3002/show/traer");
        
        if (us.data) {
            users = us.data;
            res.render("tableUsers",{users:users}); 
        } else {
            console.log("");
            res.status(401).send(".");
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        res.status(500).send("Hubo un error al procesar la solicitud.");
    }
    
});

ruta.get("/reg", async (req, res) => {


    res.render("registro");
});

ruta.post("/newuser", async (req, res) => {
    console.log('hola' + req.body.email);
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    console.log(data);
    try {
        const ms = await axios.post("http://127.0.0.1:3002/register/nuevousuario", data, {   
        });
        res.render("login");
    } catch (error) {
        console.error("Error en la solicitud:", error);
        res.status(500).send("Hubo un error al procesar la solicitud.");
    }
});

ruta.post("/logUser", async (req, res) => {
    const { email, password } = req.body;
    try {
        const us = await axios.get(`http://127.0.0.1:3002/loger/log/${email}/${password}`);
        
        if (us.data) {
            console.log("Nombre de usuario:", us.data.name);
            res.redirect("/tables"); 
        } else {
            console.log("Usuario no encontrado o credenciales incorrectas.");
            res.status(401).send("Usuario no encontrado o credenciales incorrectas.");
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        res.status(500).send("Hubo un error al procesar la solicitud.");
    }
});



module.exports = ruta;