const express = require('express');
const controller = require('../controllers/task.controller');

const router = express.Router();

router
  .route('/')
  
  .get(controller.list)
 
  .post(controller.create);

router
  .route('/:taskid')
  
  .get(controller.get)
  
  .patch(controller.update)
  
  .delete(controller.remove);

module.exports = router;
