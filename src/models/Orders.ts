import mongoose, { Document, Schema } from "mongoose";


export interface OrderInterface extends Document {
    userId: string;
    customerId: string;
    productId: string;
    productName: string;
    productQuantity: number;
    orderAmount: number;
    createdAt?: Date;
    updatedAt: Date;
}

const OrderSchema: Schema<OrderInterface> = new Schema({
    userId: {
        type: String,
        required: [true, 'User Id is required']
    },
    customerId: {
        type: String,
        required: [true, 'Customer Id is required']
    },
    productId: {
        type: String,
        required: [true, 'Product Id is required']
    },
    productName: {
        type: String,
        required: [true, 'Product name is required']
    },
    productQuantity: {
        type: Number,
        required: [true, 'Number is required']
    },
    orderAmount: {
        type: Number,
        required: [true, 'Order amount is required']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: false
    },
    updatedAt: {
        type: Date,
        required: [true, 'Updated at is required']
    },
})

const OrderModel = (mongoose.models.Orders as mongoose.Model<OrderInterface> || mongoose.model('Orders', OrderSchema))

export default OrderModel