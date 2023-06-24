const express = require("express");
const Model = require("../models/parentModel");
const verifyToken = require("../auth/adminAuth");

const parent = express.Router();

// add parent
parent.post("/add-parent", verifyToken, async (req, res) => {
  const emailExist = await Model.findOne({ email: req.body.email });
  const waExist = await Model.findOne({ wa: req.body.wa });

  if (emailExist)
    return res.status(400).json({
      message: "email sudah digunakan",
    });
  if (waExist)
    return res.status(400).json({
      message: "nomor whatsapp sudah digunakan",
    });
  const data = new Model(req.body);
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
parent.get("/parents", verifyToken, async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
parent.get("/parent/:id", verifyToken, async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = parent;
