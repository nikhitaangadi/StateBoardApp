const Doubts=require('../models/doubts')

const DoubtsController={}

DoubtsController.create=(req,res)=>{
    const lectureId=req.params.lectureId
    const body=req.body
    const doubts=new Doubts(body)
    body.lectureId=lectureId
    body.studentId=req.user.id
    doubts.save()
        .then((doubt)=>{
            res.json(doubt)
        })
        .catch((error)=>{
            res.json(error)
        })
}

DoubtsController.show=(req,res)=>{
    const lectureId=req.params.id
    Doubts.find({lectureId:lectureId})
        .then((doubt)=>{
            res.json(doubt)
        })
        .catch((error)=>{
            res.json(error)
        })
}

DoubtsController.update=(req,res)=>{
    const doubtId=req.params.id
    const body=req.body
    body.userId=req.user.id
    Doubts.findByIdAndUpdate({_id:doubtId},body,{new:true, runValidations:true})
        .then((doubt)=>{
            res.json(doubt)
        })
        .catch((error)=>{
            res.json(error)
        })
}

DoubtsController.delete=(req,res)=>{
    const doubtId=req.params.id
    Doubts.delete({_id:doubtId})
        .then((doubt)=>{
            res.json(doubt)
        })
        .catch((error)=>{
            res.json(error)
        })
}

module.exports=DoubtsController