const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const Workouts = require('./routes/workouts')
const users = require('./routes/user')

//config env
dotenv.config();

//create instance app
const app = express();


//middelware
app.use(cors());
app.use((req,res,next)=>{
    console.log(req.url,req.method)
    next()
})

app.use(express.json())
//routes for workouts
app.use('/api/workout',Workouts)
app.use('/api/user',users)

//connect to my db mongo
mongoose.connect(process.env.MONGOSS_URL)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log("DB connected & server listening in port",process.env.PORT)
        })
    })
    .catch((e)=>console.log("Error",e))

// Server listen in PORT