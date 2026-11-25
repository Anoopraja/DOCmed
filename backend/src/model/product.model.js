
import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    isDiscontinued: {
      type: Boolean,
      default: false,
    },

    manufacturerName: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["allopathy", "ayurvedic", "homeopathy", "other"],
      default: "allopathy",
    },

    packSizeLabel: {
      type: String,
      trim: true,
    },

    shortComposition1: {
      type: String,
      trim: true,
    },

    shortComposition2: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Medicine = mongoose.model("Medicine", medicineSchema);

export default Medicine;
