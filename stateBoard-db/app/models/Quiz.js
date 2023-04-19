const mongoose = require('mongoose')
const mongoose_delete=require('mongoose-delete')
const Schema = mongoose.Schema
const questionSchema = new Schema({
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    }
})
const quizSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    questions: [questionSchema]
})
quizSchema.plugin(mongoose_delete, { overrideMethods: 'all' })
const Quiz = mongoose.model('Quiz', quizSchema)

module.exports = Quiz