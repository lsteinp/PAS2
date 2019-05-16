import * as mongoose from 'mongoose';

export const TagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
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

const Tag = mongoose.model('Tag', TagSchema);
module.exports = Tag;
