import { Request, Response } from 'express'
import { taskValidation } from '../validation/taskValidation'
import Tasks from '../model/taskModel'

export const addTaskController = async (req: Request, res: Response) => {

    try {
        req.body.assignedTo = JSON.parse(req.body.assignedTo);
        req.body.start = JSON.parse(req?.body?.start)
        req.body.end = JSON.parse(req?.body?.end)
        req.body.date = JSON.parse(req?.body?.date)
        const { value, error } = taskValidation.validate(req?.body)

        if (error) {
            throw new Error(error?.message)
        }

        const data = await Tasks.create(value)
        res.status(200).json({ status: 'success', data })

    } catch (error: any) {
        console.log(error)
        res.status(500).json({ status: 'error', message: error?.message || 'internal server error' })
    }
}

export const fetchMyTasksController = async (req: Request, res: Response) => {
    try {
        const id = req?.user._id;
        const data = await Tasks.find({
            $or: [
                { assignedTo: { $in: [id] } },
                { userId: id }
            ]
        }).populate({
            path: 'assignedTo',
        });

        res.status(200).json({ status: 'success', data })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ status: 'error', message: error?.message || 'internal server error' })
    }
}

export const editTaskController = async (req: Request, res: Response) => {
    try {

        req.body.assignedTo = JSON.parse(req.body.assignedTo);
        req.body.start = JSON.parse(req?.body?.start)
        req.body.end = JSON.parse(req?.body?.end)
        req.body.date = JSON.parse(req?.body?.date)
        const { value, error } = taskValidation.validate(req?.body)

        if (error) {
            throw new Error(error?.message)
        }
        const id = req?.params?.id
        const data = await Tasks.updateOne({ _id: id }, { $set: value })
        res.status(200).json({ status: 'success', data })

    } catch (error: any) {
        console.log(error)
        res.status(500).json({ status: 'error', message: error?.message || 'internal server error' })
    }
}

export const deleteTaskController = async (req: Request, res: Response) => {
    try {
        const id = req?.params?.id;
        await Tasks.deleteOne({ _id: id })
        res.status(200).json({ status: 'success' })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ status: 'error', message: error?.message || 'internal server error' })
    }
}

