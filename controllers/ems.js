const express = require('express');

const router = express.Router();

const { Employees } = require('../models');

router.get('/', async (req, res, next) => {
    try {
        const myEmployees = await Employees.find({})
        console.log(myEmployees);
        const context = {
            employees: myEmployees
        }
        res.render('members/index.ejs', context)
    } catch(err) {
        console.log(err);
        return next();
    }
});

router.get('/new', (req, res) => {
    res.render('members/new.ejs');
});

router.post('/', async (req, res, next) => {
    try {
        console.log(req.body);
        const newEmployee = await Employees.create(req.body);
        // mySeedData.push(newArtist);
        console.log(newEmployee);
        res.redirect('/')
    } catch(err) {
        console.log(err);
        return next();
    }
})

module.exports = router