const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const usermiddleware = require('../middleware/reqlogin')
const adminmiddleware = require('../middleware/adminmiddleware')
const User = mongoose.model('User')
router.post('/add', usermiddleware, (req, res) => {
    const { title } = req.body
    if (!title) {
        return res.status(422).json({ error: "Please fill all the fields" })
    }
    User.findByIdAndUpdate(req.user._id, {
        $push: { list: title }
    }, {
        new: true
    }).then(data => {
        res.json(data)
    })
})
router.post('/userlist', usermiddleware, (req, res) => {
    res.json(req.user.list)
    console.log(req.user.list);
})
router.post('/delete/:id', usermiddleware, (req, res) => {
    var arr = 0
    User.findById(req.user._id, (err, data) => {
        arr = data.list.filter((val) => {
            return val != req.params.id
        })
    }).then(() => {
        User.findByIdAndUpdate(req.user._id, {
            list: arr
        }, {
            new: true
        }).then(data => {
            res.json(data)
        })
    })
})

router.post('/alluser', adminmiddleware, (req, res) => {
    User.find().then(data => {
        res.json(data)
    })
})

router.post('/makeadmin/:id', usermiddleware, (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
        admin: true
    }, { new: true }).then(data => {
        res.json("successfully admin created")
    })
})
router.post('/removeadmin/:id', adminmiddleware, (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
        admin: false
    }, { new: true }).then(data => {
        res.json("successfully admin created")
    })
})

module.exports = router