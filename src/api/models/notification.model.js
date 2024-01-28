const mongoose = require("mongoose");
const httpStatus = require("http-status");
const { omitBy, isNil } = require("lodash");
const APIError = require("../errors/api-error");
const { number } = require("joi");

/**
 * notification Roles
 */

/**
 * notification Schema
 * @private
 */
const notificationSchema = new mongoose.Schema({
  url: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
    trim: true,
  },
  createdTime: {
    type: Number,
  },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
// notificationSchema.pre("save", async function save(next) {
//   try {
//     console.log("pre save");
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// });

/**
 * Statics
 */
notificationSchema.statics = {
  /**
   * Get notification
   *
   * @param {ObjectId} id - The objectId of notification.
   * @returns {Promise<User, APIError>}
   */
  async get(id) {
    let user;

    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await this.findById(id).exec();
    }
    if (user) {
      return user;
    }

    throw new APIError({
      message: "User does not exist",
      status: httpStatus.NOT_FOUND,
    });
  },

  findNotificationAfterTime(time) {
    return this.find({ createdTime: time })
      .sort({ createdTime: -1 })
      .limit(2)
      .exec();
  },
};

/**
 * @typedef notification
 */
module.exports = mongoose.model("notification", notificationSchema);
