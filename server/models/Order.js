import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    customization: {
      flowerType: { type: String, required: true },
      colorScheme: { type: String, required: true },
      style: { type: String, required: true },
      accessories: { type: [String], required: true },
      size: { type: String, required: true },
      messageTag: { type: String, default: '' },
    },
  }],
  address: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  deliveryDate: { type: Date, required: true },
  
  totalPrice: { type: Number, required: true, default: 0 },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
