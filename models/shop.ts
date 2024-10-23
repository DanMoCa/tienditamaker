// models/Tienda.js
import mongoose from "mongoose";

const TiendaSchema = new mongoose.Schema({
  subdominio: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  colores: { type: Object, required: true },
  logo: { type: String },
  eslogan: { type: String },
  template: { type: String, required: true }, // Nombre del template de Sanity
});

export default mongoose.models.Tienda || mongoose.model("Tienda", TiendaSchema);
