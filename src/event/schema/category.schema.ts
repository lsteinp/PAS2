import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
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

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
