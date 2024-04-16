const express = require("express");
const { create,all,excel} = require("../controllers/product");


const router = express.Router();

router.post("/create", create);
router.get("/all", all);
router.get("/excel", excel);

module.exports =  router;