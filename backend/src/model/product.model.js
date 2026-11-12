
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      trim: true,
    },

    genericName: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    composition: {
      type: [String],
      required: true,
    },

    manufacturer: {
      type: String,
      trim: true,
    },

    medicineType: {
      type: String,
      enum: [
        "allopathy",
        "ayurvedic",
        "homeopathy",
        "other",
      ],
      default: "allopathy",
    },

    productForm: {
      type: String,
      enum: [
        "tablet",
        "capsule",
        "syrup",
        "injection",
        "cream",
        "ointment",
        "drops",
        "inhaler",
        "powder",
        "other",
      ],
      required: true,
    },

    packSize: {
      type: String,
    },

    mrp: {
      type: Number,
      required: true,
      min: 0,
    },

    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    requiresPrescription: {
      type: Boolean,
      default: false,
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    image: {
      type: String,
      default: null,
    },

    shopowner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isDiscontinued: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Medicine", productSchema);

export default Product;
