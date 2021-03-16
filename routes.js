const express = require('express');
const { restart } = require('nodemon');
const controller = require('./controller');
const router = express.Router();

//"homepage"
router.get('/', function(req, res) {
  res.status(200).send('hatCHRy Homepage')
})

//all possible path 
router.get('/USA', controller.getGraph, controller.getLocation)
router.get('/CAN', controller.getGraph, controller.getLocation)
router.get('/MEX', controller.getGraph, controller.getLocation)
router.get('/BLZ', controller.getGraph, controller.getLocation)
router.get('/GTM', controller.getGraph, controller.getLocation)
router.get('/SLV', controller.getGraph, controller.getLocation)
router.get('/HND', controller.getGraph, controller.getLocation)
router.get('/NIC', controller.getGraph, controller.getLocation)
router.get('/CRI', controller.getGraph, controller.getLocation)
router.get('/PAN', controller.getGraph, controller.getLocation)


module.exports = router;