import { Request, Response } from 'express'
import { signupValidation } from '../validation/signupValidation'
import Users from '../model/userModel'
import { hashPassword, validatePassword } from '../service/bcrypt'
import { generateToken } from '../service/jwt'
import { loginValidation } from '../validation/loginValidation'

export const signupController = async (req: Request, res: Response) => {
    try {
        const { value, error } = signupValidation.validate(req?.body)

        if (error) {
            throw new Error(error?.message)
        }
        value.password = await hashPassword(value.password)
        console.log(value)
        const data = await Users.create(value)
        if (!data) {
            throw Error('Failed to signup')
        }
        const token = generateToken({ email: data?.email, _id: data?._id })
        res.status(200).json({ status: 'success', data, token })

    } catch (error: any) {
        if (error?.code === 11000) {
            res.status(500).json({ status: 'error', message: 'The user is already exists' })
            return
        }
        res.status(500).json({ status: 'error', message: error?.message || 'internal server error' })
    }
}

export const loginController = async (req: Request, res: Response) => {
    try {
        const { value, error } = loginValidation.validate(req?.body)
        if (error) {
            throw new Error(error?.message)
        }
        const data = await Users.findOne({ email: value?.email })
        if (!data) {
            res.status(401).json({ status: 'error', message: 'Invalid email or password' })
            return
        }

        const match = await validatePassword(value?.password, data?.password)

        if (!match) {
            res.status(401).json({ status: 'error', message: 'Invalid email or password' })
            return
        }

        const token = generateToken({ email: data?.email, _id: data?._id })
        res.status(200).json({ status: 'success', token, data })
    } catch (error: any) {
        res.status(500).json({ status: 'error', message: error?.message || 'internal server error' })
    }
}

export const fetchUserController = async (req: Request, res: Response) => {
    try {

        const email = req?.user?.email
        const data = await Users.findOne({ email })
        res.status(200).json({ status: 'success', data, isAuthenticated: true })

    } catch (error: any) {
        res.status(500).json({ status: 'error', message: error?.message || 'internal server error' })
    }
}

export const fetchManagersController = async (req: Request, res: Response) => {
    try {

        const data = await Users.find({ role: 'manager' }, { fullName: 1, _id: 1 })
        res.status(200).json({ status: 'success', data })
    } catch (error: any) {
        res.status(500).json({ status: 'error', message: error?.message || 'internal server error' })
    }
}

export const fetchEmployeesController = async (req: Request, res: Response) => {
    try {

        const id = req?.params?.id;
        const data = await Users.find({ managerId: id })
        res.status(200).json({ status: 'success', data })
    } catch (error: any) {
        res.status(500).json({ status: 'error', message: error?.message || 'internal server error' })
    }
}