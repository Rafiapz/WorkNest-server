import { Router } from 'express'
import { fetchEmployeesController, fetchManagersController, fetchUserController, loginController, signupController } from '../controller/userController'
import { authMiddleware } from '../middleware/userMiddleware'

const router = Router()

router.route('/fetch-managers').get(fetchManagersController)

router.route('/signup').post(signupController)

router.route('/login').post(loginController)

router.use(authMiddleware)

router.route('/fetch-user').get(fetchUserController)

router.route('/fetch-employees/:id').get(fetchEmployeesController)

export default router