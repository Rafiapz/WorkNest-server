import mongoose, { Schema, ObjectId, } from 'mongoose';

export interface ITasks {
    title: String;
    description: String;
    assignedTo: ObjectId[];
    userId: ObjectId;
    date: Date;
    start: Date;
    end: Date;
}

const TasksSchema: Schema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, },
    assignedTo: [{ type: Schema.Types.ObjectId, required: true, ref: 'Users' }],
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    date: { type: Date, required: true }

}, { timestamps: true });

const Tasks = mongoose.model<ITasks>('Tasks', TasksSchema);

export default Tasks;

