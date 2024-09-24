import mongoose, { Document, Schema} from "mongoose";

export interface User extends Document {
    mobile: number;
    username: string;
    isVerified?: boolean;
    pin: string;
    createdAt?: Date;
}

const UserSchema: Schema<User> = new Schema({
    mobile: {
        type: Number,
        required: [true, 'Mobile number is required']
    },
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    isVerified: {
        type: Boolean,
        default: false,
        required: false
    },
    pin: {
        type: String,
        required: [true, 'Pin is required']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: false
    }
})

const UserModel = (mongoose.models.Users as mongoose.Model<User> ||
    mongoose.model('Users',UserSchema));

export default UserModel;