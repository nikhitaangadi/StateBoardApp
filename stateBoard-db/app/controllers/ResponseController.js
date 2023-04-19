const Response = require('../models/Response')
const Question = require('../models/Question')

const ResponseController = {}

ResponseController.create = (req, res) => {
    const quizId = req.params.quizId
    const studentId = req.user.id
    const body = req.body
    const response=new Response()
    response.quizId=quizId
    response.studentId=studentId
    response.questions=body
    console.log(body)
    Question.findOne({ _id: body.questionId })
        .then((ques) => {
            console.log(ques.answer, body.response)
            if (ques.answer == body.response) {
                response.questions.isCorrect = true
            }else{
                response.questions.isCorrect = false
            }
            
            response.save()
                .then((response) => {
                    res.json(response)
                })
                .catch((error) => {
                    res.json(error)
                })
        })
}


ResponseController.showAll = (req, res) => {
    const body = req.body
    const studentId = body.studentId
    const quizId = body.quizId
    Response.find({ studentId: studentId, quizId: quizId })
        .then((response) => {
            res.json(response)
        })
        .catch((error) => {
            res.json(error)
        })
}

ResponseController.delete = (req, res) => {
    const quizId = req.params.id
    const studentId = body.user.id
    Response.delete({ studentId: studentId, quizId: quizId })
        .then((response) => {
            res.json(response)
        })
        .catch((error) => {
            res.json(error)
        })
}

module.exports = ResponseController    
