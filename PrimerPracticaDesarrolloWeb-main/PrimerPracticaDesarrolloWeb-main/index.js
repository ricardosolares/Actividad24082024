const { conexion } = require('./BaseDeDatos/conexion.js');
const express = require("express");
const cors = require("cors");

const Articulo = require('./models/articulo.js');

conexion();

const app = express();
const puerto = 3900;

app.use(cors());

app.use(express.json());

app.listen(puerto, ()=>{
    console.log("Sevidor corriendo en el puerto " + puerto);
})

app.get("/probando", (req, res) => {
    console.log("Se ha ejecutado el endpoint probando");
    return res.status(200).send(`
        <div>
            <h1>Probando nuestra ruta en NodeJS</h1>
        </div>    
    `);
})

// Obtener todos los artículos
app.get("/articulos", async (req, res) => {
    try {
        const articulos = await Articulo.find();
        res.status(200).json(articulos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los artículos" });
    }
});

// Insertar un nuevo artículo
app.post("/articulos", async (req, res) => {
    try {
        const nuevoArticulo = new Articulo(req.body);
        const articuloGuardado = await nuevoArticulo.save();
        res.status(201).json(articuloGuardado);
    } catch (error) {
        res.status(500).json({ message: "Error al guardar el artículo" });
    }
});

// Actualizar un artículo existente
app.put("/articulos/:id", async (req, res) => {
    try {
        const articuloActualizado = await Articulo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(articuloActualizado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el artículo" });
    }
});

// Eliminar un artículo
app.delete("/articulos/:id", async (req, res) => {
    try {
        await Articulo.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Artículo eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el artículo" });
    }
});
