import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({

    shopName: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'accepted'],
        default: 'pending'
    },
    paymentMethod:{
        type:String,
        require: true,
        enum:['cod', 'upi']
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    items: [
        {
            itemName: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            imageUrl: {
                type: String,
                required: true
            }
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }


}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;