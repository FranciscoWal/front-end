var express = require("express");
var path = require("path");
var cors = require("cors"); 
var app= express();
var routes=require("./rutas/userRutas");
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/",routes);
var port=process.env.PORT || 80;
app.listen(port, ()=>{
    console.log("Servidor en http://localhost:"+port)
});