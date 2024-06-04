import { Request, Response, NextFunction } from 'express';

export interface ValidationOptions {
  type?: 'string' | 'number' | 'boolean' | 'array';
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  contains?: string;
  custom?: (value: any) => boolean;
  customError?: string;
}

const validateField = (value: any, options: ValidationOptions): { valid: boolean; error?: string } => {
  if (value === undefined || value === null) {
    return { valid: false, error: 'Parameter is missing' };
  }

  if (options.type) {
    if ((options.type === 'array' && !Array.isArray(value)) || (options.type !== 'array' && typeof value !== options.type)) {
      return { valid: false, error: `Parameter should be of type ${options.type}` };
    } 
  }

  if (options.minLength !== undefined && value.length < options.minLength) {
    return { valid: false, error: `Parameter should have at least ${options.minLength} characters` };
  }

  if (options.maxLength !== undefined && value.length > options.maxLength) {
    return { valid: false, error: `Parameter should have at most ${options.maxLength} characters` };
  }

  if (options.min !== undefined && value < options.min) {
    return { valid: false, error: `Parameter should be at least ${options.min}` };
  }

  if (options.max !== undefined && value > options.max) {
    return { valid: false, error: `Parameter should be at most ${options.max}` };
  }

  if (options.contains && !value.includes(options.contains)) {
    return { valid: false, error: `Parameter should contain ${options.contains}` };
  }

  if (options.custom && !options.custom(value)) {
    return { valid: false, error: options.customError || 'Parameter failed custom validation' };
  }

  return { valid: true };
};

export const validate = (fields: { [key: string]: ValidationOptions }, nullables?: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const field in fields) {
      if (fields.hasOwnProperty(field) && (nullables === undefined || !nullables.includes(field))) {
        const value = req.body[field];
        const { valid, error } = validateField(value, fields[field]);
        if (!valid) {
          return res.status(400).send(`Validation error for '${field}': ${error}`);
        }
      }
    }
    next();
  };
};
