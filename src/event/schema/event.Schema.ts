import * as mongoose from 'mongoose';

const typeStatus: string [] = ['Aprovado', 'Reprovado', 'Em analise'];

export const EventSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: typeStatus,
        default: typeStatus[0],
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
        require: true,
    },
    // tag: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Tag',
    //     require: false,
    // }],
    picture: {
        type: String,
    },
    startDate: {
        type: String,
        default: Date.now,
        required: true,
    },
    endDate: {
        type: String,
        default: Date.now,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    hours: {
        type: Number,
        required: true,
    },
    address: {
        street: {
            type: String,
            required: true,
        },
        complements: {
            type: String,
            required: true,
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
