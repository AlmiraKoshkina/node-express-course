const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const CustomAPIError = require("../errors/custom-error");

// GET /api/v1/tasks
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

// POST /api/v1/tasks
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

// GET /api/v1/tasks/:id
const getTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new CustomAPIError(`No task with id: ${req.params.id}`, 404));
  }

  res.status(200).json({ task });
});

// PATCH /api/v1/tasks/:id
const updateTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(new CustomAPIError(`No task with id: ${req.params.id}`, 404));
  }

  res.status(200).json({ task });
});

// DELETE /api/v1/tasks/:id
const deleteTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    return next(new CustomAPIError(`No task with id: ${req.params.id}`, 404));
  }

  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
