import express from 'express';
import { addFood, addSaleProduct, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';


const foodRouter = express.Router();
// Image storage engine
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});
const upload = multer({ storage: storage });
// Routes for regular products
foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.get('/list', listFood);
foodRouter.post('/remove', removeFood);

// Route for sale products
foodRouter.post('/add-sale', upload.single('image'), addSaleProduct);


export default foodRouter;
