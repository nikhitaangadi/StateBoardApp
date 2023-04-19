const mongoose=require('mongoose')
const mongoose_delete=require('mongoose-delete')
const Schema=mongoose.Schema
const billingSchema=new Schema({
    courseId:{
        type:Schema.Types.ObjectId,
        ref:'Course',
        required:true
    },
    studentId:{
        type:Schema.Types.ObjectId,
        ref:'Student',
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:['completed', 'Pending']
    }
})
billingSchema.plugin(mongoose_delete, { overrideMethods: 'all' })
const Billing=mongoose.model('Billing',billingSchema)

module.exports=Billing