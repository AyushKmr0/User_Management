import { Router } from 'express';
import { listUsers, getUser, createUser, updateUser, deleteUser, exportCSV } from '../controllers/user.controller.js';
import { upload } from '../utils/upload.js';

const router = Router();

router.get('/', listUsers);
router.get('/export', exportCSV);
router.get('/:id', getUser);
router.post('/', upload.single('avatar'), createUser);
router.put('/:id', upload.single('avatar'), updateUser);
router.delete('/:id', deleteUser);

export default router;
