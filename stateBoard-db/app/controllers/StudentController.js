const StudentProfile=require('../models/StudentProfile')

const StudentController={}

StudentController.create=(req,res)=>{
    const body=req.body
    const student=new StudentProfile(body)
    student.studentId=req.params.studentId
    student.save()
        .then((student)=>{
            res.json(student)
        })
        .catch((err)=>{
            res.json(err)
        })
}

StudentController.show=(req,res)=>{
    const id=req.user.id
    StudentProfile.find({studentId:id})
        .then((student)=>{
            res.json(student)
        })
        .catch((err)=>{
            res.json(err)
        })
}

StudentController.showOne=(req,res)=>{
    const id=req.params.studentId
    StudentProfile.find({studentId:id})
        .then((student)=>{
            res.json(student)
        })
        .catch((err)=>{
            res.json(err)
        })
}

StudentController.update=(req,res)=>{
    const id=req.user.id
    const body=req.body
    StudentProfile.findByIdAndUpdate({studentId:id},body,{new:true, runValidations:true})
        .then((student)=>{
            res.json(student)
        })
        .catch((err)=>{
            res.json(err)
        })
}

StudentController.updateImage = (req, res) => {
    if (req.file) {
        const body = req.body
        body.Photo = req.file.path
        StudentProfile.findOneAndUpdate({ userId: req.user.id }, body, { new: true, runValidations: true })
            .then((profile) => {
                res.json(profile)
            })
            .catch((errors) => {
                res.json(errors)
            })
    } else {
        res.json({ errors: 'Only jpg, jpeg and png file supported!' })
    }
}

StudentController.delete=(req,res)=>{
    const id=req.user.id
    StudentProfile.findByIdAndDelete({studentId:id})
        .then((student)=>{
            res.json(student)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports=StudentController