const express = require("express");
const router = express.Router();
const cvControllers = require('../controllers/cvControllers')

router.get("/getcvs",cvControllers.GetCVs);
router.post("/createcv",cvControllers.CreateCV);
router.post("/removecv",cvControllers.RemoveCV);

module.exports = router;

