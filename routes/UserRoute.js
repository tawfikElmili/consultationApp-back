const express = require('express');
const router = express.Router();
const User = require('../models/User');
var jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

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

// login
router.post('/login', async (req, res) => {
    try {

        const newUser = await User.find({ email: req.body.email }).limit(1);
        const decryptedString = cryptr.decrypt(newUser[0].password);
        if (newUser.length < 1) {
            await res.json({ status: "err", message: 'Email Does not Exists' });
            return;
        }
        if (decryptedString !== req.body.password) {
            await res.json({ status: "err", message: 'Wrong Paswword' });

            return;
        }
        if (newUser[0].enabled === 0) {
            await res.json({ status: "err", message: 'User is Disabled' });
            return;
        }
        var payload = {
            id: newUser[0]._id,
        }
        let token = jwt.sign(payload, 'fakroun');
        res.json({ status: "ok", message: 'Welcome Back', UserData: newUser, token });
    } catch (err) {
        res.header("Access-Control-Allow-Headers", "*");
        res.json({ message: err.message });
    }

});


// register
router.post('/register', async (req, res) => {

    const encryptedPWD = cryptr.encrypt(req.body.password);
    let user = new User({

        username: req.body.username,
        email: req.body.email,
        password: encryptedPWD,
        numTel: req.body.numTel,
    });
    console.log(user);
    try {
        const newUser = await User.find({ email: req.body.email });
        if (newUser === undefined || newUser.length == 0) {
            user = await user.save();
            res.json({ status: "ok", message: 'Account Create ! You can now Login' });
            return;
        }

        res.json({ status: "err", message: 'Email Already Exists' });
    } catch (err) {
        res.header("Access-Control-Allow-Headers", "*");
        res.json({ message: err.message });
    }

})

//find by email
router.get('/:email', async (req, res) => {
    try {
        const post = await User.findById(req.params.email);
        res.json(post);
    } catch (err) {
        res.json({ message: err })

    }
})

router.get('/all', async (req, res) => {
    try {
        const users = await User.find();
        users.filter(u => u.status === true && u.role === "Personnel")
        res.json(users);
    } catch (error) {
        res.json({ message: error.message });

    }
});

router.post('/giveAccess', verifyToken, async (req, res) => {
    try {
        const us = await U.findById({ _id: req.id });

        if (req.body.status = null) {
            us.status = req.body.status;
        }
        us.save();
        await res.json(us);

    } catch (error) {

    }

});




module.exports = router;
