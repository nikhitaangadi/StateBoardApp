const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    }
})
const doubtsSchema = new Schema({
    lectureId: {
        type: Schema.Types.ObjectId,
        ref: 'Course.lectures',
        required: true
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    body: {
        type: String,
        required: true
    },
    comments: [commentSchema],
    status: {
        type: String,
        required: true
    }
})

const Doubt = mongoose.model('Doubt', doubtsSchema)

module.exports = Doubt