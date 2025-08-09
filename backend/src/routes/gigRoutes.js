const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth")
const {
    getAllGigs,
    createGig,
    updateGig,
    deleteGig
} = require("../controllers/gigController/gigController")

router.get('/getAllGigs', getAllGigs);
router.post('/createGig', auth, createGig);
router.post('/updateGig/:slug', auth, updateGig);
router.delete('/deleteGig/:slug', auth, deleteGig);

module.exports = router;