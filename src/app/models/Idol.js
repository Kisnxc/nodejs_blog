const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ObjectId = Schema.ObjectId;

const Idol = new Schema({
    _id: {type: Number,},
    name: { type: String, required: true, maxLength: 255 },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 600 },
    videoId: { type: String, maxLength: 255, required: true },
    slug: { type: String, slug: 'name', unique: true },
    deleted: { type: Boolean,required: true, default: false},

}, {
    _id: false,
    timestamps: true,
});


mongoose.plugin(slug);
Idol.plugin(mongooseDelete,
    {
        overrideMethods: true,
        deletedAt: true,
    });
Idol.plugin(AutoIncrement);

module.exports = mongoose.model('Idol', Idol);