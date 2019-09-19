import * as mongoose from 'mongoose';

const typeStatus: string [] = ['avaliado', 'pendente'];

export const GroupSchema = new mongoose.Schema({
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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    members:[{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
    }],
    evaluation:[{
        evaluator:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        software: {
            type: Number,
        },
        process: {
            type: Number,
        },
        pitch: {
            type: Number,
        },
        innovation: {
            type: Number,
        },
        teamFormation: {
            type: Number,
        },
    }],
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

const Group = mongoose.model('Group', GroupSchema);
module.exports = Group;
