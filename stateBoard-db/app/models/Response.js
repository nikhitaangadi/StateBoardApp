const mongoose = require('mongoose')
const mongoose_delete=require('mongoose-delete')
const Schema = mongoose.Schema
const questionSchema = new Schema({
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    response: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        required: true,
        default:false
    }
})
const responseSchema = new Schema({
    quizId: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    questions: [questionSchema],
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    }
})
responseSchema.plugin(mongoose_delete, { overrideMethods: 'all' })
const Response = mongoose.model('Response', responseSchema)

module.exports = Response