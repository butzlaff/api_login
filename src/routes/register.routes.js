import { Router } from 'express';

const router = Router();

// const userController = new UserController();

router.post('/', (_req, res) => res.status(200).json({ ok: "Working" }) );

export default router;