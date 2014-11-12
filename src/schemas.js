var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

exports.fbPost = new Schema({
  id:{type: String, required: true},
  postDate: {type: Date, required: true},
  totalLikes: {type: Number, required: true},
  created: {type: Date, default: Date.now}
  // station: {type: String, required: true},
  // stationName: {type: String, required: true},
  // elevation: {type: Number, required: true},
  // lat: {type: Number, required: true},
  // long: {type: Number, required: true},
  // date: {type: Date, required: true},
  // dt00: {type: String, required: true},
  // totalSnow: {type: Number, required: true},
  // mmxt: {type: String, required: true},
  // mmnt: {type: String, required: true},
  // modified: {type: Date, default: Date.now()}
});
