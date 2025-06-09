const  mongoose =  require("mongoose");

const scoreSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);
  const ScoreModel = mongoose.model("Score", scoreSchema);

module.exports = ScoreModel