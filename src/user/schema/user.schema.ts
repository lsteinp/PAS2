import * as mongoose from 'mongoose';

const typeRole = ['Admin', 'User', 'Organizer'];

export const UserSchema = new mongoose.Schema({
    role: {
        type: String,
        default: typeRole[1],
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    interestCategories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
    ],
    favoritedEvents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        },
    ],
    participatedEvents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        },
    ],
    createdEvents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
},
{
    toJSON: {
      versionKey: false,
      virtuals: true,
    },
  });

const User = mongoose.model('User', UserSchema);
module.exports = User;
