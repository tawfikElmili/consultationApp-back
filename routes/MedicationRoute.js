const express = require("express");
const router = express.Router();
const Medication = require("../models/Medication");
var jwt = require("jsonwebtoken");

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
    let medication = new Medication({
      consultationId: req.body.consultationId,
      designation: req.body.designation,
      note: req.body.note,
    });
    await medication.save();

    res.json({ status: "ok", message: "medication add to DataBase" });
  } catch (err) {
    res.json({ status: "err", message: err.message });
  }
});

router.get("/getByConsultation/:id", verifyToken, async (req, res) => {
  try {
    const medications = await Medication.find({
      consultationId: req.param.consultationId,
    });
    res.json(medications);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.post("/update", verifyToken, async (req, res) => {
  try {
    const medication = await Medication.findById({ id: req.body.id });

    if (req.body.designation != null) {
      consultation.designation = req.body.designation;
    }
    if (req.body.note != null) {
      consultation.note = req.body.note;
    }
    medication.save();
    res.json(medication);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.delete("/Consultation/delete/:id", (req, res) => {
  Medication.findByIdAndRemove(req.params.id).then((medication) => {
    if (!medication) {
      return res.status(404).send({
        message: " error in update with id : " + req.params.id,
      });
    }
  });
});
module.exports = router;
