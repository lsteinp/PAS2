import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
},
{timestamps: true},
);
