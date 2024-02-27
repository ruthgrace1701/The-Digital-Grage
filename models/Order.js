const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    totalCost:{
        type:Number
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            required: true,
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    orderStatus: {
        type: String,
        default: 'Not Accepted',
    },
});

const OrderModel = mongoose.model('Order', OrderSchema);

module.exports = OrderModel;
