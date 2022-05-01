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
            await res.json({ status: "err", message: 'Email Does not Exist' });
            return;
        }
        if (decryptedString !== req.body.password) {
            await res.json({ status: "err", message: 'Wrong Paswword' });

            return;
        }
        if (newUser[0].status === false) {
            await res.json({ status: "err", message: 'User is disabled pledase contact hr or check your email' });
            return;
        }
        var payload = {
            id: newUser[0]._id,
        }
        let token = jwt.sign(payload, 'fakroun');
        res.json({ status: "ok", message: 'Welcome Back', UserData: newUser, token });
    } catch (err) {
        res.header("Access-Control-Allow-Headers", "*");
        res.json({status: "err", message: err.message });
    }

});


// register
router.post('/register', async (req, res) => {
    const encryptedPWD = cryptr.encrypt(req.body.password);
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: encryptedPWD,
        numTel: req.body.numTel,
        gender: req.body.gender,
        status: false,
        role: req.body.role,
    });
    try {
        const newUser = await User.find({ email: req.body.email });
        
        if (newUser === undefined || newUser.length == 0) {
            await user.save();
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

router.post('/getAll', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.json({ status:'error', message: error.message });
    }
});

router.post('/giveAccess', verifyToken, async (req, res) => {
    try {
        console.log("give access")
        const us = await User.findById({ _id: req.body._id });
        const pwd = cryptr.decrypt(us.password);
            us.status = !req.body.status;
        us.save();
        if (us.status == true) {
            sendAccssToPersonalWithEmail(us, pwd);
        }
        await res.json(us);

    } catch (error) {
        res.json({ status:'error', message: error.message });
    }

});

router.post('/update', verifyToken, async (req, res) => {
    try {
        console.log("update")
        const us = await User.findById({ _id: req.body._id });
            us = req.body;
        us.save();
        await res.json(us);

    } catch (error) {
        res.json({ status:'error', message: error.message });
    }

});


function sendAccssToPersonalWithEmail(us, pwd) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'add email adress',
            pass: 'add password'
        }
    });

    var mailOptions = {
        from: 'email address',
        to: us.email,
        subject: 'Access to ConsulationApp',
        text: 'login : ' + us.email + '\n password :' + pwd,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {

        }
    });
}



module.exports = router;
