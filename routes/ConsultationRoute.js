const express = require("express");
const router = express.Router();
const Consultation = require("../models/Consultation");
const Medication = require("../models/Medication");
var jwt = require("jsonwebtoken");
const User = require("../models/User");

function verifyToken(req, res, next) {
  let payload;
  if (req.query.token === "null") {
    return res.status(401).send("Unauthorized request");
  }
  try {
    payload = jwt.verify(req.query.token, "bte_HealthApp_Pfe_Oumayma");
  } catch (e) {
    return res.status(400).send("Invalid User");
  }
  if (!payload) {
    return res.status(401).send("Unauthorized request");
  }

  decoded = jwt.decode(req.query.token, { complete: true });
  req.id = decoded.payload.id;

  next();
}

router.post("/add", verifyToken, async (req, res) => {
  try {
    let consultation = new Consultation({
      userId: req.id,
      userAffectId: req.body.userAffectId,
      title: req.body.title,
      observation: req.body.observation,
      description: req.body.description,
    });
    await consultation.save();
    req.body.medicationList.forEach((element) => {
      try {
        let medication = new Medication({
          consultationId: consultation.id,
          designation: element.designation,
          note: element.note,
        });
        medication.save();
      } catch (err) {
        console.log(err.message);
      }
    });

    res.json(consultation);
  } catch (err) {
    res.json({ status: "err", message: err.message });
  }
});

router.post("/getAll", verifyToken, async (req, res) => {
  try {
    console.log(req.body);
    let consultation;
    if (req.body.role === "DOCTOR") {
      consultation = await Consultation.find({ userId: req.body.id });
    } else {
      consultation = await Consultation.find({ userAffectId: req.body.id });
    }
    console.log(consultation);
    res.json(consultation);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/getById/:id", verifyToken, async (req, res) => {
  try {
    const consultation = await Consultation.findOne({ id: req.params.id });
    res.json(consultation);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.post("/update", verifyToken, async (req, res) => {
  const consultation = await Consultation.findById({ id: req.body.id });

  if (req.body.observation != null) {
    consultation.observation = req.body.observation;
  }
  if (req.body.description != null) {
    consultation.description = req.body.description;
  }
  consultation.save();
  await res.json(consultation);
});

router.delete("/delete/:id", (req, res) => {
  Consultation.findOneAndRemove({ id: req.params.id }).then((consultation) => {
    if (!consultation) {
      return res.status(404).send({
        message: "consultation not found with id " + req.params.id,
      });
    }
  });
});
module.exports = router;
