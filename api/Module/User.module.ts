import mongoose from "mongoose";
const { Schema, model } = mongoose;

export interface IUser {
    name: string;
    email: string;
    password?: string;
    phone: string;
    role: "admin" | "gabay" | "user";
    kehilaSlugs: string[];
    googleId?: string;
}

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "gabay", "user"],
        default: "user"
    },
    kehilaSlugs: {
        type: [String],
        default: []
    },
    googleId: {
        type: String,
    }
}, { timestamps: true });

const User = model('User', UserSchema);

export { User };
