import mongoose, { Document, Schema } from "mongoose";

enum MeasurmentType {
    DOZEN = "Dozen",
    KG = "KG"
}

export interface ProductInterface extends Document {
    productName: string;
    productLogo?: string;
    productRate: number;
    productMeasurementType: MeasurmentType;
    userId: string
}

const ProductSchema: Schema<ProductInterface> = new Schema({
    productName: {
        type: String,
        required: [true, 'Product name is required']
    },
    productLogo: {
        type: String,
        required: false
    },
    productRate: {
        type: Number,
        required: [true, 'Product price is required']
    },
    productMeasurementType: {
        type: String,
        required: [true, 'Product measurment type is required']
    },
    userId: {
        type: String,
        required: [true, 'User Id is required to add product']
    }
})

const ProductModel = (mongoose.models.Products as mongoose.Model<ProductInterface> || mongoose.model('Products', ProductSchema))

export default ProductModel