import mongoose, { Document, Schema } from "mongoose";
import { ObjectId } from "mongodb";

export interface IBlog extends Document {
    _id: ObjectId;
    title: string;
    content: string;
    authorId: Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const BlogSchema: Schema<IBlog> = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true, unique: true },
    authorId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
},
    {
        timestamps: true
    }
)

export const BlogModel = mongoose.model<IBlog>('blog', BlogSchema)
