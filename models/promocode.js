import mongoose from 'mongoose';
const promoCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    discount: {
        type: Number,
        required: true,
    },
});

export const PromoCode = mongoose.model('PromoCode', promoCodeSchema);