require('dotenv').config();
const express=require('express');
const UserRouter = require('./routes/user.routes');
const connectDB = require('./config/db');

const app=express();

connectDB(); // mongodb connection

app.use(express.json());

app.use('/api',UserRouter)

app.get('/test',(req,res)=>{
    try{
    res.send('This is a test route')
    }catch(err){
        console.log(err.message)
        res.status(500).json({msg: 'Something went wrong'})
    }
});

app.use((req,res)=>{
res.status(500).json({msg: 'Undefined route'})
})
const PORT=process.env.PORT || 5000
console.log(`port >> ${PORT}`)
app.listen(PORT,()=>{
    console.log('Server started at port',PORT);
})