const mongoose=require('mongoose')
const mongoose_delete=require('mongoose-delete')
const Schema=mongoose.Schema
const teacherSchema=new Schema({
    teacherId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    Profession:{
        type:String,
        required:true
    },
    Subject:{
        type:String,
        required:true
    },
    Photo:{
        type:String
    }
})
teacherSchema.plugin(mongoose_delete, { overrideMethods: 'all' })
const Teacher=mongoose.model('Teacher',teacherSchema)

module.exports=Teacher