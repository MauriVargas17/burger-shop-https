import { validate, ValidationOptions } from './validate';

const burgerValidationRules: { [key: string]: ValidationOptions } = {
  name: { type: 'string', minLength: 3, maxLength: 50 },
  price: { type: 'number', min: 0 },
  ingredients: { type: 'array', minLength: 1, maxLength: 20},
  calories: { type: 'number', min: 0 },
  isVegetarian: { type: 'boolean' },
};

export const validateAddBurger = validate(burgerValidationRules);
export const validateUpdateBurger = validate(burgerValidationRules, ['name', 'price', 'ingredients', 'calories', 'isVegetarian']);


