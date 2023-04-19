const Billing=require('../models/Billing')

const BillingController={}

BillingController.create=(req,res)=>{
    const body=req.body
    const bill=new Billing(body)
    bill.studentId=req.user.id
    bill.save()
        .then((bill)=>{
            res.json(bill)
        })
        .catch((error)=>{
            res.json(error)
        })
}

BillingController.show=(req,res)=>{
    const billId=req.params.billId
    Billing.find({_id:billId})
        .then((bill)=>{
            res.json(bill)
        })
        .catch((error)=>{
            res.json(error)
        })
}

BillingController.showByCourse=(req,res)=>{
    const courseId=req.params.courseId
    Billing.find({courseId:courseId})
        .then((bill)=>{
            res.json(bill)
        })
        .catch((error)=>{
            res.json(error)
        })
}

BillingController.update=(req,res)=>{
    const billId=req.params.billId
    const body=req.body
    Billing.findByIdAndUpdate({_id:billId},body,{new:true, runValidations:true})
        .then((bill)=>{
            res.json(bill)
        })
        .catch((error)=>{
            res.json(error)
        })
}

module.exports=BillingController