import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

const saleModel = mongoose.models.Sale || mongoose.model('Sale', saleSchema);

export default saleModel;
