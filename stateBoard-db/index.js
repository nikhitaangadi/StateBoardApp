const express=require('express');
const cors=require('cors');
const router=require('./config/routes')
const configureDB=require('./config/database')
configureDB()

const app=express()
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use('/',router)
const port=3006

app.listen(port,function(){
    console.log('listening to port', port)
})