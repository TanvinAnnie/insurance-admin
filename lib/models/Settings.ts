import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISettings extends Document {
  websiteName: string;
  logo: string;
  favicon: string;

  email: string;
  phone: string;
  address: string;

  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  youtube: string;

  copyright: string;

  primaryColor: string;
  secondaryColor: string;

  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;

  googleMap: string;

  maintenanceMode: boolean;
  isActive: boolean;
}

const SettingsSchema = new Schema<ISettings>(
  {
    websiteName: {
      type: String,
      default: "",
    },

    logo: {
      type: String,
      default: "",
    },

    favicon: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    facebook: {
      type: String,
      default: "",
    },

    instagram: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    twitter: {
      type: String,
      default: "",
    },

    youtube: {
      type: String,
      default: "",
    },

    copyright: {
      type: String,
      default: "",
    },

    primaryColor: {
      type: String,
      default: "#2563eb",
    },

    secondaryColor: {
      type: String,
      default: "#1e293b",
    },

    seoTitle: {
      type: String,
      default: "",
    },

    seoDescription: {
      type: String,
      default: "",
    },

    seoKeywords: {
      type: String,
      default: "",
    },

    googleMap: {
      type: String,
      default: "",
    },

    maintenanceMode: {
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

const Settings: Model<ISettings> =
  mongoose.models.Settings ||
  mongoose.model<ISettings>("Settings", SettingsSchema);

export default Settings;