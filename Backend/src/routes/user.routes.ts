import express from 'express';
import { validate } from '../middleware/validator.middleware';
import { userLogin, userLogout, userProfile, userRegister } from '../controllers/user.controller';
import {userAutherized} from '../middleware/auth.middleware';

export const router = express.Router();
router.post('/register',
    validate('users:register'),
    userRegister
);

router.post('/login',
    validate('user: login'),
    userLogin
);

router.get('/profile',
    userAutherized,
    userProfile
)

router.post('/logout',
    userAutherized,
    userLogout
)

