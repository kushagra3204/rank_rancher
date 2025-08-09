const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth")

const getServiceController = require("../controllers/serviceController/getAllServices")
const createServiceController = require("../controllers/serviceController/createService")

router.get('/getAllServices', getServiceController.getAllServices);
router.post('/createService', auth, createServiceController.createService);

module.exports = router;