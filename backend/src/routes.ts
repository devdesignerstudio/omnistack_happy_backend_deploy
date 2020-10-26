import { Router } from 'express';
import multer from 'multer';
import OrphanagesController from './controllers/OrphanagesController';
import uploadConfig from './config/upload';

const routes = Router();
const upload = multer(uploadConfig);

//index, show, create, update, delete - metodos controllers

//route get orphanages
routes.get('/orphanages', OrphanagesController.index);

//route get specific orphanage
routes.get('/orphanages/:id', OrphanagesController.show);

//route create orphanage
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);


export default routes;