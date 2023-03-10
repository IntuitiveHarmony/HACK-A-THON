const express = require('express');

const router = express.Router();

const { Employees } = require('../models');

let mySeedData = [
    {
        name: "Anita Bath",
        image: "https://cdn.midjourney.com/ce7495a0-da54-4964-b19e-03896d57c987/grid_0.png",
        role: "Janitor",
        employeeId: "1",
    }, {
        name: "Kareem O'Weet",
        image: "https://cdn.midjourney.com/281f4606-950e-4911-8c0f-d986e3c1b6fa/grid_0.png",
        role: "CEO",
        employeeId: "2",
    }, {
        name: "Lee Nover",
        image: "https://cdn.midjourney.com/82917788-2881-41d6-9b11-455b9a94a6bc/grid_0.png",
        role: "Dev",
        employeeId: "3",
    }, {
        name: "JP",
        image: "https://i.imgur.com/N1GVuj6.jpg",
        instrument: "An incredible slug",
        employeeId: "4",
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

// Seed Route

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

// New Route
router.get('/new', (req, res) => {
    res.render('members/new.ejs');
});

// Show Route
router.get('/:id', async (req, res, next) => {
    try {
        console.log(req.params)
        const employee = await Employees.findById(req.params.id);
        console.log(employee);
        const context = {
            employee: employee
        }
        res.render('members/show.ejs', context);
    } catch(err) {
        console.log(err);
        return next();
    }
})

// Update Route
router.get('/:id/edit', async (req, res, next) => {
    try {
        const personToEdit = await Employees.findById(req.params.id);
        console.log(personToEdit);
        res.render('members/edit.ejs', {personToEdit: personToEdit})
    } catch(err) {
        console.log(err);
        return next();
    }
})

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

router.put('/:id', async(req, res, next) => {
    try {
        console.log(req.params.id);
        console.log(req.body);
        const updateItem = await Employees.findByIdAndUpdate(req.params.id, req.body);
        console.log(updateItem);
        res.redirect('/ems');
    } catch(err) {
        console.log(err);
        return next();
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        console.log(req.params);
        console.log("I'm hitting the delete route");
        const itemGettingDeleted = await Employees.findByIdAndDelete(req.params.id);
        console.log(itemGettingDeleted);
        res.redirect('/ems');
    } catch(stuff) {
        console.log(stuff);
        return next();
    }
})

module.exports = router