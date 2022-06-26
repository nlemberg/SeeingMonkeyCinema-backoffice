const express = require("express");
const { addEmployee, getAllEmployees } = require("../utils/employeeUtils");

const router = express.Router();

// add/register new employee
router.post("/", addEmployee);
router.get("/", getAllEmployees);

module.exports = router;
