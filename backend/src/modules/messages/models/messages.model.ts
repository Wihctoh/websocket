import mongoose, { Schema, model } from "mongoose";

export type MessageType = {
  _id: mongoose.Types.ObjectId;
  name: String;
  message: String;
  createdAt: Date;
  updatedAt: Date;
};

const messageSchema = new Schema<MessageType>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Message = model<MessageType>("Message", messageSchema);
