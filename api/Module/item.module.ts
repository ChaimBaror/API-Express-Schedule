import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TimeSchema = new Schema({
  val: { type: String },
  name: { type: String },
  dynamic: { type: Boolean, default: false },
  zman: { type: String },
  nimus: { type: String },
  rond5minet: { type: Boolean, default: false }
}, { _id: false });

const ItemSchema = new Schema({
  _id: { type: Number },
  title: { type: String, required: true },
  description: { type: String },
  index: { type: Number },
  col: { type: String },
  times: [TimeSchema]
});

const Left = mongoose.model('Left', ItemSchema);
const Medium  = mongoose.model('Medium', ItemSchema);
const Right = mongoose.model('Right', ItemSchema);


export { Left, Medium, Right };
