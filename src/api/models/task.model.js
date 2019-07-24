
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const APIError = require('../utils/APIError');

const taskSchema = new mongoose.Schema({
  title:
  {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
    index: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  status: {
    type: Boolean,
    default: false,
  },
});

taskSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'title','text','createdAt','updatedAt','status'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});


taskSchema.statics = {
 
  async get(id) {
    try {
      let task;

      if (mongoose.Types.ObjectId.isValid(id)) {
        task = await this.findById(id).exec();
      }
      if (task) {
        return task;
      }

      throw new APIError({
        message: 'Task is not present',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

 
  list({
    page = 1, perPage = 30, id,title, text
  }) {
    const options = omitBy({ id, title ,text }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  }

  // checkIfExists({
  //   name, region,
  // }) {
  //   const options = omitBy({ name, region }, isNil);

  //   return this.findOne(options)
  //     .limit(1)
  //     .exec();
  // },

  // checkValidation(error) {
  //   const {
  //     name, message, stack, value, path,
  //   } = error;
  //   if (name === 'MongoError' && error.code === 11000) {
  //     return new APIError({
  //       message: 'Validation Error',
  //       errors: [{
  //         field: value,
  //         location: path,
  //         messages: [message],
  //       }],
  //       status: httpStatus.CONFLICT,
  //       isPublic: true,
  //       stack,
  //     });
  //   }
  //   return error;
  // },
};

module.exports = mongoose.model('Task', taskSchema);
