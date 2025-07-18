import mongoose, { Document, Schema } from "mongoose";
import _ from "lodash";

export interface IAuction extends Document {
  productId: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  status: "Active" | "Ended" | "Canceled";
}

const AuctionSchema: Schema<IAuction> = new Schema(
  {
    productId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Active", "Ended", "Canceled"],
      default: "Active",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        return _.omit(ret, ["__v", "_id"]);
      },
    },
  }
);

const AuctionModel = mongoose.model<IAuction>("Auction", AuctionSchema);

export default AuctionModel;
