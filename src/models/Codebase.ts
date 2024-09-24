import mongoose, { Schema, Document } from "mongoose";

export interface CodeBaseInterface extends Document {
    language_name: string;
    language_category: string;
    programe_name: string;
    programe_code: string;
    users?: string;
}

const CodeBaseSchema: Schema<CodeBaseInterface> = new Schema({
    language_name: {
        type: String,
        required: [true, 'Language name is required']
    },
    language_category: {
        type: String,
        required: [true, 'Language category is required']
    },
    programe_name: {
        type: String,
        required: [true, 'Programme name is required']
    },
    programe_code: {
        type: String,
        required: [true, 'Programme code is required']
    },
    users: {
        type: String,
        ref: 'Users',
        required: true,
    }
}, { timestamps: true })

const CodeBaseModel = (mongoose.models.Codebase as mongoose.Model<CodeBaseInterface> || mongoose.model('Codebase', CodeBaseSchema))

export default CodeBaseModel