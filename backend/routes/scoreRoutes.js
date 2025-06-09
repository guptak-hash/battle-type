const  express = require( "express");
const  ScoreModel  =  require("../models/scoreModel.js");

const scoreRouter = express.Router();

scoreRouter.use("/test",(req,res)=>{
     res.status(404).json({msg:"page not found"})
})

// GET SCORE BY USER ID
scoreRouter.get("/user/:userId", async (request, response) => {
  try {
    const { userId } = request.params;
    const userScores = await ScoreModel.find({ userId: userId }).sort({ value: -1 });

    if (!userScores || userScores.length === 0) {
      return response.status(404).json({ message: "No scores found for this user." });
    }

    return response.status(200).json({
      count: userScores.length,
      data: userScores
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

// GET ALL SCORES
scoreRouter.get("/", async (request, response) => {
  try {
    const scores = await ScoreModel.find({});
    return response.status(200).json({
      count: scores.length,
      data: scores
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// GET A SCORE
scoreRouter.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const score = await ScoreModel.findById(id);

    if (!score) {
      return response.status(404).send({ message: "Score not found." });
    }
    return response.status(200).json(score);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// CREATE A SCORE
scoreRouter.post("/", async (request, response) => {
  try {
    if (!request.body.userId || !request.body.value) {
      return response.status(400).send({
        message: "Please send all required fields: userId, value."
      });
    }
    // Create a new Score
    const newScore = {
      userId: request.body.userId,
      value: request.body.value
    };
    const score = await ScoreModel.create(newScore);
    return response.status(201).send(score);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// UPDATE A SCORE
scoreRouter.put("/:id", async (request, response) => {
  try {
    if (!request.body.userId || !request.body.value) {
      return response.status(400).send({
        message: "Please send all required fields: userId, value."
      });
    }
    // Attempt to update score information
    const { id } = request.params;
    const result = await ScoreModel.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response
        .status(404)
        .send({ message: "Update failed. Score not found." });
    }
    response.status(200).send({ message: "Score updated successfully." });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// DELETE A SCORE
scoreRouter.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await ScoreModel.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).send({ message: "Score not found" });
    }
    response.status(200).send({ message: "Score deleted successfully." });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});




module.exports=scoreRouter;