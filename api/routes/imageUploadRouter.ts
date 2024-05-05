import express from "express";
import { imagesUpload } from '../multer';

const imageUploadRouter = express.Router();


imageUploadRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send({message: 'No file uploaded'});
        }

        return res.status(200).json({filename: req.file.filename});
    } catch (e) {
        next(e);
    }
});


export default imageUploadRouter;