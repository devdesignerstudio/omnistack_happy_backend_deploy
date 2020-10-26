import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import { Request, Response } from 'express';
import orphanageView from '../views/orphanages';
import * as Yup from 'yup';

export default {
    async index(req: Request, res: Response){
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return res.json(orphanageView.renderMany(orphanages));
    },
    async show(req: Request, res: Response){
        const { id } = req.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return res.json(orphanageView.render(orphanage));
    },

    async create(req: Request, res: Response){
        const {
            // id,
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends//,
            // contact
        } = req.body;
    
        const orphanageRepository = getRepository(Orphanage);
        
        const reqImages = req.files as Express.Multer.File[];
        const images = reqImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends ===  'true',
            images//,
            // contact
        }

        const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                }))//,
            // contact: Yup.string().required()
        })

        await schema.validate(data, {
            abortEarly: false,
        });

        //just create on database
        const orphanage = orphanageRepository.create(data);
    
        //save on database
        await orphanageRepository.save(orphanage);
    
        return res.status(201).json({orphanage});
        // console.log(req.query);
        // console.log(req.params);
        // console.log(req.body);
        // return res.json({
        //     msg: "Hello World!"
        // });
    }
}