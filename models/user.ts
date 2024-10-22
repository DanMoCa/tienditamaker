import mongoose, { Schema, model } from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  isPaidUser: { type: Boolean, default: false }, // Nuevo campo para indicar si es de pago
  stripeCustomerId: String, // ID del cliente de Stripe para enlazar con sus pagos
  subscriptionStatus: { type: String, default: "inactive" }, // Puede ser 'active' o 'inactive'
});
