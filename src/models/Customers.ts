import mongoose , { Document, Schema} from "mongoose";

export interface CustomerInterface extends Document {
    cName: string;
    cMobile: number;
    cShopName?: string;
    cShopAddress?: string;
    userId: string
}

const CustomerSchema: Schema<CustomerInterface> = new Schema({
    cName: {
        type: String,
        required: [true, 'Customer name is required']
    },
    cMobile: {
        type: Number,
        required: [true, 'Customer mobile number is required']
    },
    cShopName: {
        type: String,
        required: false
    },
    cShopAddress: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: [true, 'User Id is required'],
        ref: 'Users'
    }
})

const CustomerModel = (
    mongoose.models.Customers as mongoose.Model<CustomerInterface> || mongoose.model('Customers', CustomerSchema)
)

export default CustomerModel