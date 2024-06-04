import { Request, Response } from 'express';
import Burger from '../models/burger';

const handleError = (error: unknown, res: Response) => {
  if (error instanceof Error) {
    res.status(400).send(error.message);
  } else {
    res.status(400).send('An unknown error occurred');
  }
};

export const addBurger = async (req: Request, res: Response) => {
  try {
    const burger = new Burger(req.body);
    await burger.save();
    res.status(201).send(burger);
  } catch (error) {
    handleError(error, res);
  }
};

export const updateBurger = async (req: Request, res: Response) => {
  try {
    const burger = await Burger.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!burger) {
      return res.status(404).send('Burger not found');
    }
    res.send({ message: 'Burger updated successfully', burger: burger });
  } catch (error) {
    handleError(error, res);
  }
};

export const getBurgers = async (_req: Request, res: Response) => {
  try {
    const burgers = await Burger.find();
    res.send({results: burgers.length, burgers});
  } catch (error) {
    handleError(error, res);
  }
};

export const getBurger = async (req: Request, res: Response) => {
  try {
    const burger = await Burger.findById(req.params.id);
    if (!burger) {
      return res.status(404).send('Burger not found');
    }
    res.send(burger);
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteBurger = async (req: Request, res: Response) => {
  try {
    const burger = await Burger.findByIdAndDelete(req.params.id);
    if (!burger) {
      return res.status(404).send('Burger not found');
    }
    res.send({ message: 'Burger deleted successfully', burger: burger });
  } catch (error) {
    handleError(error, res);
  }
};
