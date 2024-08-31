const mongoose = require("mongoose");

const articuloSchema = new mongoose.Schema({}, { strict: false });

const Articulo = mongoose.model("articulo", articuloSchema);

module.exports = Articulo;
