const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      type: String,
      name: String,
      duration: Number,
      distance: Number,
      weight: Number,
      reps: Number,
      sets: Number
    }
  ]
});

const Workout = mongoose.model("workout", wSchema);

module.exports = Workout;
