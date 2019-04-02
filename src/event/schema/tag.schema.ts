import * as mongoose from 'mongoose';

export const TagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
});

const Tag = mongoose.model('Tag', TagSchema);
module.exports = Tag;
