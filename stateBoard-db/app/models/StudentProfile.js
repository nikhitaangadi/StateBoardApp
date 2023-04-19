const mongoose=require('mongoose')
const mongoose_delete=require('mongoose-delete')
const Schema=mongoose.Schema
const studentSchema=new Schema({
    studentId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    Standard:{
        type:String,
        required:true,
        enum:['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
    },
    Photo:{
        type:String
    }
})
studentSchema.plugin(mongoose_delete, { overrideMethods: 'all' })
const Student=mongoose.model('Student',studentSchema)

module.exports=Student