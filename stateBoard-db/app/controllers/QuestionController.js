const Question=require('../models/Question')

const QuestionController={}

QuestionController.create=(req,res)=>{
    const courseId=req.params.courseId
    const teacherId=req.user.id
    const body=req.body
    const question=new Question(body)
    question.courseId=courseId
    question.teacherId=teacherId
    question.save()
        .then((question)=>{
            res.json(question)
        })
        .catch((error)=>{
            res.json(error)
        })
}

QuestionController.show=(req,res)=>{
    const courseId=req.params.courseId
    const teacherId=req.user.id
    Question.find({courseId:courseId,teacherId:teacherId})
        .then((question)=>{
            res.json(question)
        })
        .catch((error)=>{
            res.json(error)
        })
}

QuestionController.adminShow=(req,res)=>{
    const teacherId=req.params.id
    Question.find({teacherId:teacherId})
    .then((question)=>{
        res.json(question)
    })
    .catch((error)=>{
        res.json(error)
    })
}

QuestionController.showOne=(req,res)=>{
    const id=req.params.questionId
    const teacherId=req.user.id
    Question.findOne({_id:id,teacherId:teacherId})
    .then((question)=>{
        res.json(question)
    })
    .catch((error)=>{
        res.json(error)
    })
}

QuestionController.update=(req,res)=>{
    const id=req.params.id
    //const optionId=req.params.optionId
    //console.log('opt',optionId)
    const teacherId=req.user.id
    const body=req.body
    Question.findOneAndUpdate({_id:id,teacherId:teacherId},body,{new:true, runValidations:true})
    .then((question)=>{
        res.json(question)
    })
    .catch((error)=>{
        res.json(error)
    })
}

QuestionController.softDelete=(req,res)=>{
    const id=req.params.id
    const teacherId=req.user.id
    Question.deleteById({_id:id,teacherId:teacherId})
    .then((question)=>{
        res.json(question)
    })
    .catch((error)=>{
        res.json(error)
    })
}

QuestionController.restore=(req,res)=>{
    const id=req.params.id
    const teacherId=req.user.id
    Question.restore({_id:id,teacherId:teacherId})
    .then((question)=>{
        res.json(question)
    })
    .catch((error)=>{
        res.json(error)
    })
}

QuestionController.delete=(req,res)=>{
    const id=req.params.id
    const teacherId=req.user.id
    Question.findOneAndDelete({_id:id,teacherId:teacherId})
    .then((question)=>{
        res.json(question)
    })
    .catch((error)=>{
        res.json(error)
    })
}

module.exports=QuestionController