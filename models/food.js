import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['burg', 'snacks', 'soda', 'pizza', 'dessert', 'salad']
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

export default mongoose.model('Food', foodSchema);
