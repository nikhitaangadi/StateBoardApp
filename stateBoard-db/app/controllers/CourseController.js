const Course = require('../models/Course')
const CourseController = {}

CourseController.create = (req, res) => {
    const body = req.body
    const course = new Course(body)
    course.teacherId = req.user.id
    course.save()
        .then((course) => {
            res.json(course)
        })
        .catch((err) => {
            res.json(err)
        })
}

CourseController.show = (req, res) => {
    const teacherId = req.user.id
    Course.find({ teacherId: teacherId, deleted: false })
        .then((course) => {
            console.log(course)
            res.json(course)
        })
        .catch((err) => {
            res.json(err)
        })
}

CourseController.showOne = (req, res) => {
    const id = req.params.id
    const teacherId = req.user.id
    Course.find({ _id: id, teacherId: teacherId, deleted: false })
        .then((course) => {
            console.log(course)
            res.json(course)
        })
        .catch((err) => {
            res.json(err)
        })
}

CourseController.adminShow = (req, res) => {
    const teacherId = req.params.teacherId
    Course.find({ teacherId: teacherId, deleted: false })
        .then((course) => {
            console.log(course)
            res.json(course)
        })
        .catch((err) => {
            res.json(err)
        })
}

CourseController.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Course.findByIdAndUpdate({ _id: id }, body, { new: true, runValidations: true })
        .then((course) => {
            res.json(course)
        })
        .catch((err) => {
            res.json(err)
        })
}

CourseController.updateLectures = (req, res) => {
    const id = req.params.id
    const body = req.body
    const lectureId = body._id
    if (req.file) {
        body.url = req.file.path
        Course.findOne({ _id: id })
            .then((response) => {
                console.log('response', response)
                let update = (response.lectures.find((ele) => { return ele._id == lectureId }))
                const array = response.lectures.map((ele) => {
                    if (ele._id == lectureId) {
                        return { ...ele, ...body }
                    } else {
                        return { ...ele }
                    }
                })
                response.lectures = [...array]
                Course.findByIdAndUpdate({ _id: id }, response, { new: true, runValidations: true })
                    .then((newUpdate) => {
                        res.json(newUpdate)
                    })
                    .catch((error) => {
                        res.json(error)
                    })
            })
    } else {
        Course.findOne({ _id: id })
            .then((response) => {
                console.log('response', response)
                let update = (response.lectures.find((ele) => { return ele._id == lectureId }))
                const array = response.lectures.map((ele) => {
                    if (ele._id == lectureId) {
                        return { ...ele, ...body }
                    } else {
                        return { ...ele }
                    }
                })
                response.lectures = [...array]
                Course.findByIdAndUpdate({ _id: id }, response, { new: true, runValidations: true })
                    .then((newUpdate) => {
                        res.json(newUpdate)
                    })
                    .catch((error) => {
                        res.json(error)
                    })
            })
    }
}

CourseController.uploadLectures = (req, res) => {
    const id = req.params.id
    const body = req.body
    body.url = req.file.path
    console.log('body', body)
    Course.findOne({ _id: id })
        .then((response) => {
            response.lectures = [...response.lectures, body]
            Course.findByIdAndUpdate({ _id: id }, response, { new: true, runValidations: true })
                .then((newUpdate) => {
                    res.json(newUpdate)
                })
                .catch((error) => {
                    res.json(error)
                })
        })
}

CourseController.softDelete = (req, res) => {
    const id = req.params.id
    const teacherId = req.user.id
    Course.deleteById({ _id: id, teacherId: teacherId })
        .then((course) => {
            res.json(course)
        })
        .catch((err) => {
            res.json(err)
        })
}

CourseController.restore = (req, res) => {
    const id = req.params.id
    const teacherId = req.user.id
    Course.restore({ _id: id, teacherId: teacherId })
        .then((course) => {
            res.json(course)
        })
        .catch((err) => {
            res.json(err)
        })
}

CourseController.delete = (req, res) => {
    const id = req.params.id
    const teacherId = req.user.id
    Course.findByIdAndDelete({ _id: id, teacherId: teacherId })
        .then((course) => {
            res.json(course)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = CourseController
