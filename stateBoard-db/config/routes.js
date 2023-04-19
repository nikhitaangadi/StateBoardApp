const express = require('express')
const router = express.Router()
const UserController = require('../app/controllers/UserController')
const CourseController = require('../app/controllers/CourseController')
const TeacherController = require('../app/controllers/TeacherController')
const StudentController = require('../app/controllers/StudentController')
const ResponseControler = require('../app/controllers/ResponseController')
const QuizController = require('../app/controllers/QuizController')
const QuestionController = require('../app/controllers/QuestionController')
const DoubtsController = require('../app/controllers/DoubtsController')
const BillingController = require('../app/controllers/BillingController')
const { authenticateUser, authorize } = require('../app/middlewares/authenticate')
const upload = require('../app/middlewares/upload')
const uploadLectures=require('../app/middlewares/uploadLectures')
const Admin='admin'
const Teacher='Teacher'
const Student='Student'
router.post('/api/user/register', UserController.register)
router.post('/api/user/login', UserController.login)
router.get('/api/user/account', authenticateUser, authorize(Roles=['Teacher','admin']), UserController.account)


//Teacher Routes
router.post('/api/teacher/create', authenticateUser,authorize(Roles=[Teacher,Admin]),  TeacherController.create)
router.get('/api/teacher/showAll', authenticateUser,authorize(Roles=[Admin,Student]), TeacherController.showAll)
router.put('/api/teacher/update', authenticateUser,authorize(Roles=[Teacher]), TeacherController.update)
router.put('/api/teacher/updateImage', authenticateUser,authorize(Roles=[Teacher]),upload.single('Photo'), TeacherController.updateImage)
router.delete('/api/teacher/delete', authenticateUser,authorize(Roles=[Teacher,Admin]), TeacherController.delete)

//Student Routes
router.post('/api/student/create', authenticateUser, StudentController.create)
router.get('/api/student/show', authenticateUser,authorize(Roles=[Teacher,Admin]), StudentController.show)
router.get('/api/student/showOne/:studentId', authenticateUser, StudentController.showOne)
router.put('/api/student/update', authenticateUser,authorize(Roles=[Student]), StudentController.update)
router.put('/api/student/updateImage', authenticateUser,authorize(Roles=[Teacher]),upload.single('Photo'), StudentController.updateImage)
router.delete('/api/student/delete', authenticateUser,authorize(Roles=[Student]), StudentController.delete)

//Course Controller
router.post('/api/course/create', authenticateUser,authorize(Roles=[Teacher]), CourseController.create)
router.get('/api/course/show', authenticateUser, CourseController.show)
router.get('/api/course/showOne/:id', authenticateUser, CourseController.showOne)
router.get('/api/course/adminShow/:teacherId', authenticateUser, CourseController.adminShow)
router.put('/api/course/update/:id', authenticateUser,authorize(Roles=[Teacher]), CourseController.update)
router.put('/api/course/updateLectures/:id', authenticateUser,authorize(Roles=[Teacher]),uploadLectures.single('url'), CourseController.updateLectures)
router.put('/api/course/uploadLectures/:id', authenticateUser,authorize(Roles=[Teacher]), uploadLectures.single('url'), CourseController.uploadLectures)
router.delete('/api/course/softDelete/:id', authenticateUser,authorize(Roles=[Teacher]), CourseController.softDelete)
router.delete('/api/course/restore/:id', authenticateUser,authorize(Roles=[Teacher]), CourseController.restore)
router.delete('/api/course/delete/:id', authenticateUser,authorize(Roles=[Teacher]), CourseController.delete)

//Question Controller
router.post('/api/question/create/:courseId', authenticateUser,authorize(Roles=[Teacher]), QuestionController.create)
router.get('/api/question/show/:courseId', authenticateUser, QuestionController.show)
router.get('/api/question/showOne/:questionId', authenticateUser, QuestionController.showOne)
router.get('/api/question/adminShow/:teacherId', authenticateUser, QuestionController.adminShow)
router.put('/api/question/update/:id', authenticateUser,authorize(Roles=[Teacher]), QuestionController.update)
router.delete('/api/question/softDelete/:id', authenticateUser,authorize(Roles=[Teacher]), QuestionController.softDelete)
router.delete('/api/question/restore/:id', authenticateUser,authorize(Roles=[Teacher]), QuestionController.restore)
router.delete('/api/question/delete/:id', authenticateUser,authorize(Roles=[Teacher]), QuestionController.delete)

//Quiz Controller
router.post('/api/quiz/create/:courseId', authenticateUser,authorize(Roles=[Teacher]), QuizController.create)
router.get('/api/quiz/showAll/:courseId', authenticateUser, QuizController.showAll)
router.get('/api/quiz/showOne/:quizId', authenticateUser, QuizController.showOne)
router.put('/api/quiz/update/:quizId', authenticateUser,authorize(Roles=[Teacher]), QuizController.update)
router.delete('/api/quiz/softDelete/:id', authenticateUser,authorize(Roles=[Teacher]), QuizController.softDelete)
router.delete('/api/quiz/restore/:id', authenticateUser,authorize(Roles=[Teacher]), QuizController.restore)
router.delete('/api/quiz/delete/:id', authenticateUser,authorize(Roles=[Teacher]), QuizController.delete)

//Response Controller
router.post('/api/response/create/:quizId', authenticateUser,authorize(Roles=[Student]), ResponseControler.create)
router.get('/api/response/showAll', authenticateUser, ResponseControler.showAll)
router.delete('/api/response/delete/:id', authenticateUser,authorize(Roles=[Teacher]), ResponseControler.delete)

//Doubt Controller
router.post('/api/doubts/create/:lectureId', authenticateUser, DoubtsController.create)
router.get('/api/doubts/show/:lectureId', authenticateUser, DoubtsController.show)
router.put('/api/doubts/update/:doubtId', authenticateUser, DoubtsController.update)
router.delete('/api/doubts/delete/:id', authenticateUser, DoubtsController.delete)

//Billing Controller
router.post('/api/billing/create', authenticateUser, BillingController.create)
router.get('/api/billing/show/:billId', authenticateUser, BillingController.show)
router.get('/api/billing/show/:courseId', authenticateUser, BillingController.showByCourse)
router.put('/api/billing/update/:billId', authenticateUser, BillingController.update)

module.exports = router