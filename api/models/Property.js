import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  type: { type: String, enum: ["sale","rent"], default: "sale" },
  locationText: String,
  coordinates: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], default: [90.4, 23.78], index: "2dsphere" } // [lng, lat]
  },
  rooms: Number,
  features: [String],
  images: [String],
  listedBy: { type: mongoose.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["pending","approved","rejected"], default: "approved" },
  isSold: { type: Boolean, default: false },
  isRented: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Property", propertySchema);
