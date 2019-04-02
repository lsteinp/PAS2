import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
