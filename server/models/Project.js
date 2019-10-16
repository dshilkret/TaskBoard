const mongosse = require('mongoose');
const Schema = mongosse.Schema;

const projectSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true
    },
}, { timestamps: true});


module.exports = mongosse.model('Project', projectSchema);