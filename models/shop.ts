import mongoose, { Schema, model } from "mongoose";

const TiendaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  subdominio: { type: String, required: true, unique: true },
  template: { type: String, required: true },
  estadoSubscripcion: {
    type: String,
    enum: ["activo", "inactivo"],
    default: "inactivo",
  },
  fechaCreacion: { type: Date, default: Date.now },
});

const Tienda = mongoose.model("Tienda", TiendaSchema);

module.exports = Tienda;
