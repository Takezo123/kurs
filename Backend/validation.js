import {body} from 'express-validator';

export const validationChain= [
    body('email',"Некорректный email").isEmail(),
    body('password',"Некорректный пароль").isLength({min: 4}),
    body('name',"Некорректное имя").isLength({min: 4}),
    body('avatarUrl',"Некорректный URL").optional().isURL(),
];