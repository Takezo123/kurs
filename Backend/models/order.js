const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    items: [{
        food: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food',
        },
        quantity: Number,
    }],
    total: Number,
    status: {
        type: String,
        enum: ['placed', 'accepted', 'delivering', 'completed'],
        default: 'placed',
    },
    deliveryType: {
        type: String,
        enum: ['delivery', 'pickup'],
        default: 'delivery',
    },
    promoCode: {
        type: String,
        ref: 'PromoCode',
    },
});
export const Order = mongoose.model('Order', orderSchema);