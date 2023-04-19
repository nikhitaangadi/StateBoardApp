const TeacherProfile=require('../models/TeacherProfile')

const TeacherController={}

TeacherController.create=(req,res)=>{
    const body=req.body
    const teacher=new TeacherProfile(body)
    teacher.teacherId=req.params.teacherId
    teacher.save()
        .then((teacher)=>{
            res.json(teacher)
        })
        .catch((err)=>{
            res.json(err)
        })
}

TeacherController.showAll=(req,res)=>{
    const id=req.user.id
    TeacherProfile.find()
        .then((teacher)=>{
            res.json(teacher)
        })
        .catch((err)=>{
            res.json(err)
        })
}

TeacherController.update=(req,res)=>{
    const id=req.user.id
    const body=req.body
    TeacherProfile.findByIdAndUpdate({teacherId:id},body,{new:true, runValidations:true})
        .then((teacher)=>{
            res.json(teacher)
        })
        .catch((err)=>{
            res.json(err)
        })
}

TeacherController.updateImage = (req, res) => {
    if (req.file) {
        const body = req.body
        body.Photo = req.file.path
        TeacherProfile.findOneAndUpdate({ userId: req.user.id }, body, { new: true, runValidations: true })
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

TeacherController.delete=(req,res)=>{
    const id=req.user.id
    TeacherProfile.findByIdAndDelete({teacherId:id})
        .then((teacher)=>{
            res.json(teacher)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports=TeacherController