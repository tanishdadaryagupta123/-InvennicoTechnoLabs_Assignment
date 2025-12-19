import express from 'express';
import { 
  createTask, 
  getAllTasks, 
  getTaskById, 
  updateTask, 
  deleteTask 
} from '../controllers/taskController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// All task routes are protected
router.use(auth);

router.post('/', createTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
