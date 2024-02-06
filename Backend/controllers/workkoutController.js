const Workout = require('../models/workout')
const mongoose = require('mongoose')

//Get workouts
const getWorkouts = async (req,res)=>{
    try {
        const workouts = await Workout.find({}).sort()
        // res.setHeader('Content-Type', 'application/json');
        res.status(200).json(workouts)
    } 
    catch (error) {
        console.log(error.message)
    }
}


//get wrkout
const getWorkout = async (req,res) => {
    const {id} = req.params
    try {
        const workout = await Workout.findById(id)
        res.status(200).json(workout);

    } catch (error) {
        console.log(error.message)
    }
}

//Create new workout
const createWorkout = async (req,res) => {
    const {title,reps,load} = req.body
    try {
        const workout = await Workout.create({title,reps,load})
        const message = {message:'Create succeful...'}
        res.status(200).json({message,workout})
    } 
    catch (error)
    {
        res.status(400).json({error:error.message})
    }
}

// delete 

const deleteWorkout = (req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'});
    } ;
    
    const workout = Workout.findByIdAndDelete({_id:id});

    
    if (!workout){
        return res.status(400).json({error:'No such workout'})
    }

    return workout.status(200).json(workout)

}

const updateWorkout = (req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'});
    } 

    const workout = Workout.findByIdAndUpdate({_id:id},{...req.body})

    if (!workout){
        return res.status(400).json({error:'No such workout'})
    }

    return workout.status(200).json(workout)
}
module.exports={createWorkout,getWorkouts,getWorkout,deleteWorkout,updateWorkout}