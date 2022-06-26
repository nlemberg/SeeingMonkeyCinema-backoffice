const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Employee = require("../models/employeeModel");

// get all employees
// GET /employees
// private -----------------------------
const getAllEmployees = (req, res) => {
  res.json({ message: "Add employee" });
};

// get employee by ID
// GET /employees/:id
// private -----------------------------
const getEmployeeByID = (req, res) => {
  res.json({ message: "Add employee" });
};

// get current employee
// GET /employees/current
// private -----------------------------
const getCurrentEmployee = (req, res) => {
  res.json({ message: "Add employee" });
};

// add/register new employee
// POST /employees
// private -----------------------------
const addEmployee = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, password, permissions } = req.body;

  if (!firstName || !lastName || !username || !permissions) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }

  const employeeExists = await Employee.findOne({ username });
  if (employeeExists) {
    res.status(400);
    throw new Error("Employee already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const employee = await Employee.create({
    firstName,
    lastName,
    username,
    password: hashedPassword,
    permissions,
  });

  if (employee) {
    res.status(201).json({
      _id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      username: employee.username,
      permissions: employee.permissions,
      token: generateToken(employee._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid employee data");
  }
});

// login employee
// PUT /employees/:id
// private -----------------------------
const loginEmployee = (req, res) => {
  res.json({ message: "Add employee" });
};

// edit employee
// PUT /employees/:id
// private -----------------------------
const editEmployee = (req, res) => {
  res.json({ message: "Edit employee" });
};

// delete employee
// DELETE /employees
// private -----------------------------
const deleteEmployee = (req, res) => {
  res.json({ message: "Add employee" });
};

// generate JWT
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || require("../config/keys").JWT_SECRET
  );
};

module.exports = {
  getAllEmployees,
  getEmployeeByID,
  getCurrentEmployee,
  addEmployee,
  loginEmployee,
  editEmployee,
  deleteEmployee,
};
