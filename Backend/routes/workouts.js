//Routes for workouts
const express = require('express');
const router = express.Router();
const {createWorkout,getWorkouts,getWorkout,deleteWorkout,updateWorkout} = require('../controllers/workkoutController')

router.get('/',getWorkouts)
router.get('/:id',getWorkout)

router.post('/',createWorkout)

router.delete('/:id',deleteWorkout)

router.put('/:id',updateWorkout)

module.exports = router;

