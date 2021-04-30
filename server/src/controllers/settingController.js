const Setting = require("../models/Setting");
const mongoose = require('mongoose');


const getSettings = (req, res) => {
    let settings = await Setting.find();

    // i need to return object with all the settings not  list of settings
    let settingsObj = settings.reduce((acc, setting) => {
        let newAcc = {
            ...acc,
            [setting.name]: setting.value
        }
        return newAcc;
    }, {});

    res.status(200).send(settingsObj);
}

const getSetting = (req, res) => {
    let setting = await Setting.findOne({ name: req.params.name });
    if (!setting) return res.status(400).send({ error: true, message: "setting not found" });

    res.status(200).send(setting);
}

const setSetting = (req, res) => {

    if (!req.body.name || !req.body.value)
        return res.status(400).send({ error: true, message: "both name and value are required!" });


    // find it first if it exist update it, otherwise add it


    const setting = new Setting({
        name: req.body.name,
        value: req.body.value,
    });

    try {
        const addedSetting = await setting.save();
        res.send(addedSetting);

    } catch (error) {
        let errs = Object.keys(error.errors).map(er => error.errors[er].message);
        res.status(400).send({ error: true, message: errs.join(', ') });
    }
}

const removeSetting = (req, res) => {

    if (!req.body.name)
        return res.status(400).send({ error: true, message: "name is required!" });

    let setting = await Setting.findOne({ name: req.body.name });
    if (!setting) return res.status(400).send({ error: true, message: "setting not found" });

    try {
        const deleted = await setting.delete();
        return res.status(200).send(deleted);

    } catch (error) {
        return res.status(400).send({ error: true, message: "error trying to delete setting", err: error });
    }
}

module.exports.getSettings = getSettings;
module.exports.getSetting = getSetting;
module.exports.setSetting = setSetting;
module.exports.removeSetting = removeSetting;