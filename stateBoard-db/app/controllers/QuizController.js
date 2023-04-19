const Quiz=require('../models/Quiz')

const QuizController={}

QuizController.create=(req,res)=>{
    const courseId=req.params.courseId
    const body=req.body
    const quiz=new Quiz(body)
    quiz.courseId=courseId
    quiz.save()
        .then((quiz)=>{
            res.json(quiz)
        })
        .catch((error)=>{
            res.json(error)
        })
}

QuizController.showAll=(req,res)=>{
    const courseId=req.params.courseId
    Quiz.find({courseId:courseId, deleted:false})
        .then((quiz)=>{
            res.json(quiz)
        })
        .catch((error)=>{
            res.json(error)
        })
}

QuizController.showOne=(req,res)=>{
    const id=req.params.quizId
    Quiz.findById({_id:id,deleted:false})
        .then((quiz)=>{
            res.json(quiz)
        })
        .catch((error)=>{
            res.json(error)
        })
}

QuizController.update=(req,res)=>{
    const id=req.params.quizId
    const body=req.body
    Quiz.findByIdAndUpdate({_id:id},body,{new:true,runValidations:true})
        .then((quiz)=>{
            res.json(quiz)
        })
        .catch((error)=>{
            res.json(error)
        })
}
QuizController.softDelete=(req,res)=>{
    const id=req.params.id
    Quiz.deleteById({_id:id})
        .then((quiz)=>{
            if(quiz){
                res.json('deleted successfully')
            }
        })
        .catch((error)=>{
            res.json(error)
        })
}

QuizController.restore=(req,res)=>{
    const id=req.params.id
    Quiz.restore({_id:id})
        .then((quiz)=>{
            if(quiz){
                res.json('restored successfully')
            }
        })
        .catch((error)=>{
            res.json(error)
        })
}

QuizController.delete=(req,res)=>{
    const id=req.params.is
    Quiz.delete({_id:id})
        .then((quiz)=>{
            if(quiz){
                res.json('deleted successfully')
            }
        })
        .catch((error)=>{
            res.json(error)
        })
}

module.exports=QuizController