import mongoose from "mongoose";
const { Schema, model } = mongoose;
export interface Users {
    id: number
    name: string
    email: string
}


// Define User and Post (Timetable) models
const UserSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const User = model('User', UserSchema);

export { User };

