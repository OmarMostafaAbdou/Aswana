import mongoose, { Document, Schema } from "mongoose";
import _ from "lodash";
import { ToJSONLangOptions } from "types/Category";

export interface ICategory extends Document {
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  image: string;
}

const categoryTransform = (
  _doc: mongoose.Document,
  ret: Record<string, any>,
  options: mongoose.ToObjectOptions
) => {
  const lang = (options as ToJSONLangOptions).lang || "en";
  
  if (ret.name && typeof ret.name === 'object') {
    ret.name = ret.name[lang] || ret.name.en || '';
  }
  
  if (ret.description && typeof ret.description === 'object') {
    ret.description = ret.description[lang] || ret.description.en || '';
  }
  
  ret.id = ret._id;
  
  delete ret._id;
  delete ret.__v;
  
  return ret;
};

const CategorySchema: Schema<ICategory> = new Schema(
  {
    name: {
      en: { type: String, required: true, unique: true },
      ar: { type: String, required: true, unique: true },
    },
    description: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: { transform: categoryTransform },
  }
);

const CategoryModel = mongoose.model<ICategory>("Category", CategorySchema);
export default CategoryModel;