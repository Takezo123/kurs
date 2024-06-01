import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {validationResult} from 'express-validator';
import User from '../models/user.js';




export const register=  async (req,res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new User({
            email: req.body.email,
            name: req.body.name,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });

        const user = await doc.save();
        const token = jwt.sign({ _id: user._id }, "secret", { expiresIn: '35d', });

        const { passwordHash, ...userData } = user.toObject();
        res.json({ ...userData, token }); // Отправляем данные пользователя и токен
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" }); // Обрабатываем общую ошибку
    }
};
export const login=  async (req,res)=>{
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const password = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!password) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ _id: user._id }, "secret", { expiresIn: '35d', });
        const { passwordHash, ...userData } = user.toObject();
        res.json({ ...userData, token }); // Отправляем данные пользователя и токен
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" }); // Обрабатываем общую ошибку
    }
};
export const getUser=  async (req,res)=>{
    try {
        const user= await User.findById(req.userId);

        if(!user)  {
            return res.status(404).json({message: 'user not found',});
        }
    const {passwordHash,...userData}=user._doc;
    res.json(userData);
    }catch (err) {
        res.status(500).json({message:  'internal server error',});
    }
   
}