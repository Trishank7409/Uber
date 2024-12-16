import express from 'express';
import { validate } from '../middleware/validator.middleware';
import { captainAutherize, userAutherized } from '../middleware/auth.middleware';
import { captainLogin, captainLogout, captainProfile, captainRegistration } from '../controllers/captain.controller';

export const captainRouter = express.Router();
captainRouter.post('/register',
    validate('captain:register'),
    captainRegistration
);

captainRouter.post('/login',
    validate('captain: login'),
    captainLogin
);

captainRouter.get('/profile',
    captainAutherize,
    captainProfile
)

captainRouter.post('/logout',
    captainAutherize,
    captainLogout
     
)
