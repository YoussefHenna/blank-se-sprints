import express from "express";
import Test from "../models/testModel";
import Sauth from "../middleware/Sauth";

const router = express.Router();

router.post("/", Sauth, async (req, res) => {
  try {
    const { name } = req.body;

    const newTest = new Test({
      name,
    });

    const savedTest = await newTest.save();

    res.json(savedTest);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
