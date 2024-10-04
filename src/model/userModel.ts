import mongoose, { Schema, ObjectId } from 'mongoose';

export interface IUsers {
    email: String;
    password: String;
    fullName?: String;
    role: String;
    managerId?: ObjectId;
    _id?: ObjectId
}

const UsersSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    role: { type: String, required: true },
    managerId: { type: Schema.Types.ObjectId, }
});

const Users = mongoose.model<IUsers>('Users', UsersSchema);

export default Users;

