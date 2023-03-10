const express = require('express');

const router = express.Router();

const { Employees } = require('../models');

let mySeedData = [
    {
        name: "Anita Bath",
        image: "https://cdn.midjourney.com/ce7495a0-da54-4964-b19e-03896d57c987/grid_0.png",
        role: "Janitor"
    }, {
        name: "Kareem O’Weet",
        image: "https://cdn.midjourney.com/281f4606-950e-4911-8c0f-d986e3c1b6fa/grid_0.png",
        role: "CEO"
    }, {
        name: "Lee Nover",
        image: "https://cdn.midjourney.com/82917788-2881-41d6-9b11-455b9a94a6bc/grid_0.png",
        role: "Dev"
    }, {
        name: "JP",
        image: "https://i.imgur.com/N1GVuj6.jpg",
        instrument: "An incredible slug"
    }
]

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

router.get('/seed', async (req, res, next) => {
    try {
        const deletedOldOnes = await Employees.deleteMany({});
        const addEmployees = await Employees.insertMany(mySeedData);
        console.log(addEmployees);
        res.redirect('/')
    } catch(err) {
        console.log(err);
        return next();
    }
})

router.get('/new', (req, res) => {
    res.render('members/new.ejs');
});

router.post('/', async (req, res, next) => {
    try {
        console.log(req.body);
        const newEmployee = await Employees.create(req.body);
        mySeedData.push(newEmployee);
        console.log(newEmployee);
        res.redirect('/')
    } catch(err) {
        console.log(err);
        return next();
    }
})

module.exports = router