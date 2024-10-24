// models/Tienda.js
import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
  subdominio: { type: String, required: false, unique: true },
  nombre: { type: String, required: false },
  descripcion: {
    type: String,
    required: false,
    default: "descripción de la tienda",
  },
  colores: { type: Object, required: false },
  logo: { type: String },
  eslogan: { type: String },
  template: { type: String, required: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Relación con el modelo User
});

export default mongoose.models.Shop || mongoose.model("Shop", ShopSchema);
