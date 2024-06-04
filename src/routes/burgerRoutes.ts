import { Router } from 'express';
import { addBurger, updateBurger, getBurgers, getBurger, deleteBurger } from '../controllers/burgerController';
import { validateAddBurger, validateUpdateBurger } from '../middlewares/validateBurger';

const router = Router();

router.post('/burgers', validateAddBurger, addBurger);
router.put('/burgers/:id', validateUpdateBurger, updateBurger);
router.get('/burgers', getBurgers);
router.get('/burgers/:id', getBurger);
router.delete('/burgers/:id', deleteBurger);

export default router;

