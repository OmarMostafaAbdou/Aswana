import mongoose, { Document, Schema } from "mongoose";
import { ToJSONLangOptions } from "types/user";
import _, { create } from "lodash";

export interface IProduct extends Document {
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  image: string;
    categoryId: mongoose.Types.ObjectId;
    price: number;
    isAuction: boolean;
    sellerId: mongoose.Types.ObjectId;
     createdAt?: Date;
  updatedAt?: Date;
  gallery: string[];
  
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    title: {
      en: { type: String, required: true,unique: true },
      ar: { type: String, required: true,unique: true },
    },
    description: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    image: { type: String, required: true },
     categoryId: {
        required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    price: { type: Number, required: true },
    isAuction: { type: Boolean, default: false },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "User",
  },
    gallery: {
      type: [String],
      default: [],
    },
    
},

  {
        timestamps: true,

    toJSON: {
      transform: (doc, ret, options: mongoose.ToObjectOptions & Partial<ToJSONLangOptions> = {}) => {
        const lang = options.lang || "en";
        ret.name = ret.name?.[lang] || ret.name?.en;
        ret.description = ret.description?.[lang] || ret.description?.en;
        ret.id = ret._id;
        return _.omit(ret, ["__v", "_id"]);
      },
    },
  }
);

export const ProductModel = mongoose.model("product", ProductSchema);

