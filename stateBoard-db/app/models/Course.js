const mongoose = require('mongoose')
const mongoose_delete=require('mongoose-delete')
const Schema = mongoose.Schema

const lectureSchema = new Schema({
    lectureType: {
        type: String,
        required: true,
        enum: ['video', 'pdf']
    },
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})
const enrollmentSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    status: {
        type: String,
        required: true
    }
})
const courseSchema = new Schema({
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    lectures: [lectureSchema],
    language: {
        type: String,
        required: true
    },
    courseFee: {
        type: Number,
        required: true
    },
    enrollments: [enrollmentSchema]
})

courseSchema.plugin(mongoose_delete, { overrideMethods: 'all' })
const Course = mongoose.model('Course', courseSchema)

module.exports = Course





