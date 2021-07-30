const { response } = require("express");
const mongoose = require("mongoose");
const router = require("express").Router();
const Workout = require("../models/workout");

router.post("/api/workouts", (req, res) => {
    Workout.create({})
        .then((workout) => {
            res.json(workout)
        })
        .catch((err) => {
            res.json(err)
        })
});

router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        },
        {
            $sort: { "day": 1 }
        }
    ])
        .then(workout => {
            console.log(workout)
            res.json(workout);
        })
        .catch((err) => {
            res.json(err)
        });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration:
                    { $sum: "$exercises.duration" },
                totalweight:
                    { $sum: "$exercises.weight" }
            }
        }
    ])
        .limit(7)
        .then((workout) => {
            res.json(workout)
        })
        .catch((err) => {
            res.json(err)
        });
})

router.put("/api/workouts/:id", (req, res) => {
    Workout.findOneAndUpdate(
        req.params.id,
        { $push: { exercises: req.body } },
        { new: true, runValidators: true }
    )
        .then(workout => {
            res.json(workout);
        })
        .catch((err) => {
            res.json(err)
        });
})

module.exports = router;
