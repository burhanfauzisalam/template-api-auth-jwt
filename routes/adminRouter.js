const express = require("express");
const Model = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const verifyToken = require("../auth/adminAuth");
require("dotenv").config();

const router = express.Router();

// add admin
router.post("/add-admin", async (req, res) => {
  const usernameExist = await Model.findOne({ username: req.body.username });
  const emailExist = await Model.findOne({ email: req.body.email });
  const waExist = await Model.findOne({ wa: req.body.wa });

  if (usernameExist)
    return res.status(400).json({
      message: "username sudah digunakan",
    });
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

//login
router.post("/admin-login", async (req, res) => {
  const cekUser = await Model.findOne({ username: req.body.username });
  const cekPassword = await Model.findOne({ password: req.body.password });

  if (!cekUser)
    return res.status(400).json({
      message: "Maaf, anda bukan admin.",
    });
  if (!cekPassword)
    return res.status(400).json({
      message: "Password anda salah.",
    });

  const token = jwt.sign({ _id: cekUser._id }, process.env.SECRET, {
    expiresIn: "1h",
  });
  res.header("token", token).json({
    token: token,
    data : cekUser,
  });
  // res.json(cekUser);
});

//Get all Method
router.get("/admin", verifyToken, async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Cek token
router.get("/cekToken", verifyToken, async (req, res) => {
  try {
    res.status(200).json({message: 'token valid'});
  } catch (error) {
    res.status(400).json({ message: 'Silahkan login' });
  }
});

//Get by ID Method
router.get("/admin/:id", verifyToken, async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: "Jangan merubah data" });
  }
});

//Update by ID Method
router.patch("/update-admin/:id", verifyToken, async (req, res) => {
  const usernameExist = await Model.findOne({ username: req.body.username });
  const emailExist = await Model.findOne({ email: req.body.email });
  const waExist = await Model.findOne({ wa: req.body.wa });

  if (usernameExist)
    return res.status(400).json({
      message: "username sudah digunakan",
    });
  if (emailExist)
    return res.status(400).json({
      message: "email sudah digunakan",
    });
  if (waExist)
    return res.status(400).json({
      message: "nomor whatsapp sudah digunakan",
    });
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.status(200).json({ message: "Data updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/delete-admin/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.p_name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
