import mongoose from 'mongoose';

const saleItemSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'food', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const saleSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  items: [saleItemSchema]
});

const saleModel = mongoose.models.Sale || mongoose.model('Sale', saleSchema);

export default saleModel;
