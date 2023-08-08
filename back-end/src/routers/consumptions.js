const express = require('express');
const Consumptions = require("../db/schemas/Consumptions")
const auth = require('../middleware/auth');
const router = new express.Router();
var mongoose = require('mongoose');

/***  ENDPOINTS ***/
// @route   POST diet-tracker-api/consumptions
// @desc    Add new log in consumptions
// @access  Private
router.post('/', auth, async (req,res) => {
    let date;
    if(req.body.date)
        date = new Date(Date.parse(req.body.date))
    else
        date = new Date();
    const resConsumptions = await Consumptions.findOne({ owner : req.user._id });
    const newLog = req.body.item;
    const isFood = (newLog.type === 'food')
    try{
        // newLog: type, log
        foundCons = false;            
        for(let cons of resConsumptions.logEntries) {
            if(areDatesSameDay(cons.date, date)) {
                foundCons = true;
                if(isFood)  cons.foodLogs.push(newLog.log)
                else cons.recipeLogs.push(newLog.log)
                addNutrients(cons.totalMacros, newLog.log.nutrients)
            }
        }
        if(!foundCons){
            // not logs for this day
            const newEntry = {
                date,
                foodLogs: [],
                recipeLogs: [],
                totalMacros: newLog.log.nutrients
            }
            if(isFood) newEntry.foodLogs.push(newLog.log)
            else newEntry.recipeLogs.push(newLog.log)
            resConsumptions.logEntries.push(newEntry)
        }
        await resConsumptions.save()
        res.status(201).send(newLog);  
    }catch(e){
        res.status(400).send({ error: e.message });
    }
})

// @route   POST diet-tracker-api/consumptions/multi
// @desc    Add multiple new logs in consumptions
// @access  Private
router.post('/multi', auth, async (req,res) => {
    let date;
    if(req.body.date)
        date = new Date(Date.parse(req.body.date))
    else
        date = new Date();
    const resConsumptions = await Consumptions.findOne({ owner : req.user._id });
    const newLogArray = req.body.items;
    try {
        for(let newLog of newLogArray){
            const isFood = (newLog.type === 'food')
            // newLog: type, log
            foundCons = false;            
            for(let cons of resConsumptions.logEntries) {
                if(areDatesSameDay(cons.date, date)) {
                    foundCons = true;
                    if(isFood)  cons.foodLogs.push(newLog.log)
                    else cons.recipeLogs.push(newLog.log)
                    addNutrients(cons.totalMacros, newLog.log.nutrients)
                    break;
                }
            }
            if(!foundCons){
                // not logs for this day
                const newEntry = {
                    date,
                    foodLogs: [],
                    recipeLogs: [],
                    totalMacros: newLog.log.nutrients
                }
                if(isFood) newEntry.foodLogs.push(newLog.log)
                else newEntry.recipeLogs.push(newLog.log)
                resConsumptions.logEntries.push(newEntry)
            }
        }
        await resConsumptions.save()
        res.status(201).send(newLogArray); 
    }
    catch(e) {
        res.status(400).send({ error: e.message });
    }
})

// @route   GET diet-tracker-api/consumptions
// @desc    Display all user logs (all days)
// @access  Private
router.get('/', auth, async (req,res) => {
    try {
        const consumptions = await Consumptions.findOne({ owner : req.user._id});
        if(consumptions !== null) {
            res.status(200).send(consumptions.logEntries);
        }
        else{
            res.status(200).send([]);
        }
    }catch(e){
        res.status(400).send({ error: e.message });
    }
})

// @route   GET diet-tracker-api/consumptions
// @desc    Display all user logs (for today)
// @access  Private
router.get('/today', auth, async (req,res) => {
    try {
        const consumptions = await Consumptions.findOne({ owner : req.user._id});
        const date = new Date()
        const todayConsumptions = consumptions.logEntries.filter(cons => {
            if(areDatesSameDay(cons.date, date)) return cons
        })
        if(todayConsumptions !== null) {
            res.status(200).send(todayConsumptions[0]);
        }
        else{
            res.status(200).send({});
        }
    }catch(e){
        res.status(400).send({ error: e.message });
    }
})

// @route   DELETE diet-tracker-api/consumptions/log/:id
// @desc    Delete a single log from given date
// @access  Private
router.delete('/log/:id', auth, async (req,res) => {
    try {
        const logId = req.params.id;
        const isFood = req.body.type === 'food'
        const date = new Date(Date.parse(req.body.date))
        const consumptions = await Consumptions.findOne({ owner : req.user._id});
        let dateFound = false;
        for(let cons of consumptions.logEntries) {
            if(areDatesSameDay(cons.date, date)){
                // found day, deleting log
                let idFound=false;
                if(isFood) {
                    cons.foodLogs = cons.foodLogs.filter(log => {
                        if(log._id == logId) {
                            subNutrients(cons.totalMacros, log.nutrients)
                            idFound = true;
                        }
                        return log._id != logId
                    })
                }
                else {
                    cons.recipeLogs = cons.recipeLogs.filter(log => {
                        if(log._id == logId) {
                            subNutrients(cons.totalMacros, log.nutrients)
                            idFound = true;
                        }
                        return log._id != logId
                    })
                }
                if(!idFound) throw new Error(`No log with id '${logId}' found in given day`)
                // if both recipe & food arrays are empty, delete whole day
                if(cons.foodLogs.length === 0 && cons.recipeLogs.length === 0){
                    consumptions.logEntries = consumptions.logEntries.filter(consumption => {
                        return consumption._id != cons._id
                    })
                }
                dateFound = true;
                break;
            }
        }
        if(dateFound) { 
            await consumptions.save()
            res.status(200).send({msg: "Log deleted"});
        }
        else throw new Error("No logs found for given day")
    }
    catch(e) {
        res.status(400).send({ error: e.message });
    }
})

// @route   DELETE diet-tracker-api/consumptions
// @desc    Delete a whole day with all logs
// @access  Private
router.delete('/day', auth, async (req,res) => {
    try {
        const date = new Date(Date.parse(req.body.date))
        const consumptions = await Consumptions.findOne({ owner : req.user._id});
        let dateFound = false;
        for(let cons of consumptions.logEntries) {
            if(areDatesSameDay(cons.date, date)){
                consumptions.logEntries = consumptions.logEntries.filter(consumption => {
                    return consumption._id != cons._id
                })
                dateFound = true;
                break;
            }
        }
        if(dateFound) { 
            await consumptions.save()
            res.status(200).send({msg: "Day deleted"});
        }
        else throw new Error("Day given not found")
    }
    catch(e) {
        res.status(400).send({ error: e.message });
    }
})

// helper
function areDatesSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

function addNutrients(nutr1, nutr2) {
    nutr1.calories += nutr2.calories
    nutr1.protein += nutr2.protein
    nutr1.fat += nutr2.fat
    nutr1.carbs += nutr2.carbs
}
function subNutrients(nutr1, nutr2) {
    nutr1.calories -= nutr2.calories
    nutr1.protein -= nutr2.protein
    nutr1.fat -= nutr2.fat
    nutr1.carbs -= nutr2.carbs
}
module.exports = router