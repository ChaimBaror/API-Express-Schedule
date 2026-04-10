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
  col: { type: String, enum: ["Right", "Medium", "Left"], required: true },
  index: { type: Number },
  times: [TimeSchema]
});

const Item = mongoose.model('Item', ItemSchema);

// Legacy models — used only for migration from old 3-collection structure
const Left = mongoose.model('Left', ItemSchema);
const Medium = mongoose.model('Medium', ItemSchema);
const Right = mongoose.model('Right', ItemSchema);

export { Item, Left, Medium, Right };
