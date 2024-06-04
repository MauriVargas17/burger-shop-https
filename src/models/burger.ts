import { Schema, model } from 'mongoose';

const burgerSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  ingredients: { type: [String], required: true },
  calories: { type: Number, required: true },
  isVegetarian: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Burger = model('Burger', burgerSchema);

export default Burger;
