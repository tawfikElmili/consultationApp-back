const express = require('express');
const router = express.Router();
const Consultation = require('../models/Consultation');
var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    let payload;
    if (req.query.token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    try { payload = jwt.verify(req.query.token, 'fakroun'); } catch (e) {
        return res.status(400).send('Invalid User');
    }
    if (!payload) {
        return res.status(401).send('Unauthorized request');
    }

    decoded = jwt.decode(req.query.token, { complete: true });
    req.id = decoded.payload.id;

    next();
}

router.post('/add', verifyToken, async (req, res) => {
    try {
        let consultation = new Consultation({
            userId: req.id,
            observaton: req.body.observaton,
            description: req.body.description,
        });
         await consultation.save();

        res.json({ status: "ok", message: 'Consultation add to DataBase' });
    } catch (err) {
        res.json({ status: 'err', message: err.message });
    }

});

router.get('/all', verifyToken, async (req, res) => {
    try {
        const consultation = await Consultation.find({ userId: req.id }
        );

        res.json(consultation);

    } catch (err) {
        res.json({ message: err.message });

    }

});

router.post('/update', verifyToken, async (req, res) => {

    const consultation = await Consultation.findById({ _id: req.body.id });

    if (req.body.observation != null) {
        consultation.observation = req.body.observation;
    }
    if (req.body.description != null) {
        consultation.description = req.body.description;
    }
    consultation.save();
    await res.json(consultation);
});


router.delete('/Consultation/delete/:id', (req, res) => {

    Consultation.findByIdAndRemove(req.params.id)
        .then(consultation => {
            if (!consultation) {
                return res.status(404).send({
                    message: "sensor not found with code " + req.params.id
                });
            }
        })
});
module.exports = router;


