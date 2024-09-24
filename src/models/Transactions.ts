import mongoose, { Document, Schema} from "mongoose";

export interface TransactionInterface extends Document {
    userId: string;
    customerId: string;
    receivedAmount: string;
    remainingAmount: string;
}

const TransactionSchema: Schema<TransactionInterface> = new Schema({
    userId: {
        type: String,
        required: [true, 'User Id is required']
    },
    customerId: {
        type: String,
        required: [true, 'Customer Id is required']
    },
    receivedAmount: {
        type: String,
        required: [true, 'Received amount is required']
    },
    remainingAmount: {
        type: String,
        required: [true, 'Remaining amount is required']
    },
})

const TransactionModel = ( mongoose.models.Transactions as mongoose.Model<TransactionInterface> || mongoose.model('Transactions', TransactionSchema))

export default TransactionModel
