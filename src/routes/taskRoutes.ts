import { Router } from 'express'
import { authMiddleware } from '../middleware/userMiddleware'
import { addTaskController, deleteTaskController, editTaskController, fetchMyTasksController } from '../controller/taskController'

const router = Router()

router.use(authMiddleware)

router.route('/add-task').post(addTaskController)

router.route('/fetch-my-tasks').get(fetchMyTasksController)

router.route('/edit-task/:id').put(editTaskController)

router.route('/delete-task/:id').delete(deleteTaskController)

export default router