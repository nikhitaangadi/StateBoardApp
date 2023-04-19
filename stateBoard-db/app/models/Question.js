const mongoose=require('mongoose')
const mongoose_delete=require('mongoose-delete')
const Schema=mongoose.Schema
const optionSchema=new Schema({
     name:{
            type:String,
            required:true
        }
})
const questionSchema=new Schema({
    teacherId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    options:[optionSchema],
    answer:{
        type:String,
        required:true
    },
    courseId:{
        type:Schema.Types.ObjectId,
        ref:'Course',
        required:true
    }
})
questionSchema.plugin(mongoose_delete, { overrideMethods: 'all' })
const Question=mongoose.model('Question',questionSchema)

module.exports=Question