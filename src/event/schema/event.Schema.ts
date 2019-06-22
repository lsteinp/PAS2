import * as mongoose from 'mongoose';

const typeStatus: string [] = ['aprovado', 'rejeitado', 'pendente'];

export const EventSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: typeStatus,
        default: typeStatus[2],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
     category: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Category',
         required: true,
     },
     tag: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Tag',
         required: true,
     }],
     vacancies: {
         type: Number,
         required: true
     },
     link: {
         type: String,
         required: true
     },
    picture: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        default: Date.now,
        required: true,
    },
    startHour: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        default: Date.now,
        required: true,
    },
    endHour: {
        type: String,
        required: true,
    },
    observation:{
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    hours: {
        type: String,
        required: true,
    },
    address: {
        street: {
            type: String,
            required: true,
        },
        complements: {
            type: String,
        },
        zipCode: {
            type: Number,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            required: true,
        }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
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

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
