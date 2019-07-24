const httpStatus = require('http-status');
const Task = require('../models/task.model');


exports.create = async (req, res, next) => {
  try {
    const task = new Task(req.body);
    const savedtask = await task.save();
    res.status(httpStatus.CREATED);
    res.json(savedtask.transform()).end();
  } catch (error) {
    console.log(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const { taskid } = req.params;
    const task = await Task.get(taskid );
    res.status(httpStatus.OK);
    res.json(task.transform());
  } catch (error) {
    console.log(error);
  }
};

exports.update = async (req, res, next) => {
  const updatedTask = req.body;
  const { taskid } = req.params;
  const task = await Task.get(taskid);
  const Newtask = Object.assign(task, updatedTask);
  res.status(httpStatus.OK);
  Newtask.save()
    .then(savedtask => res.json(savedtask.transform()))
    .catch(() => next());
};


exports.list = async (req, res, next) => {
  try {
    const tasks = await Task.list(req.query);
    const transformedtasks = tasks.map(task => task.transform());
    res.status(httpStatus.OK);
    res.json(transformedtasks);
  } catch (error) {
    console.log(error);
  }
};


exports.remove = async (req, res, next) => {
 // const { taskid } = req.params;
 //   const task = await Task.get(taskid);
 //  // const task = await Task.deleteOne({id:taskid}, function (err, result) {

 //  //       if (err) {

 //  //           console.log("error query");

 //  //       } else {

 //  //           res.status(httpStatus.OK);
 //  //           console.log("")

 //  //       }

 //  //   });

 //  Task.deleteOne({ title: taskid 
  Task.findOneAndRemove({id : req.params.taskid}, function (err) {
  if(err) console.log(err);
  console.log("Successful deletion");
});

  // findOneAndRemove({id : taskid}, function (err,offer){
  //    res.status(httpStatus.OK);
  // });
  // const user = Object.assign(task, { status: false });
 

  // task.save()
  //   .then(savedtask => res.json(savedtask.transform()))
  //   .catch(() => next());
};
