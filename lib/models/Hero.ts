import mongoose, { Schema, model, models } from "mongoose";

const HeroSchema = new Schema(
  {
    badge: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    buttonText: {
      type: String,
      required: true,
      trim: true,
    },

    buttonLink: {
      type: String,
      required: true,
      trim: true,
    },

    videoText: {
      type: String,
      default: "",
      trim: true,
    },

    videoLink: {
      type: String,
      default: "",
      trim: true,
    },

    backgroundImage: {
      type: String,
      required: true,
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

const Hero = models.Hero || model("Hero", HeroSchema);

export default Hero;