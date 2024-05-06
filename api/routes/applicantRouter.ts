import express from 'express';
import mongoose, { Types} from 'mongoose';
import {imagesUpload} from '../multer';
import auth, {RequestWithUser} from '../middleware/auth';
import Applicant from "../models/applicants/Applicant";
import permit from "../middleware/permit";

const applicantRouter = express.Router();

applicantRouter.get('/', async (_req, res, next) => {
    try {
        const applicant = await Applicant.find();
        return res.send(applicant);
    } catch (e) {
        return next(e);
    }
});

applicantRouter.get('/:id', async (req, res, next) => {
    try {
        let _id: Types.ObjectId;
        try {
            _id = new Types.ObjectId(req.params.id);
        } catch {
            return res.status(404).send({error: 'Wrong ObjectId'});
        }

        const applicant = await Applicant.findById(_id);
        return res.send(applicant);
    } catch (e) {
        return next(e);
    }
});

applicantRouter.post(
    '/',
    auth,
    imagesUpload.single('photo'),
    async (req: RequestWithUser, res, next) => {
        try {
            const data = {
                user: req.user?._id,
                firstName: req.body.firstName,
                surname: req.body.surname,
                secondName: req.body.secondName,
                photo: req.file ? req.file.filename : null,
                sex: req.body.sex,
                dateOfBirth: req.body.dateOfBirth,
                city: req.body.city,
                education: req.body.education,
                aboutApplicant: req.body.aboutApplicant,
                workExperience: JSON.parse(req.body.workExperience),
                wantedJob: req.body.wantedJob,
                wantedJobCity: req.body.wantedJobCity,
            };

            const applicant = new Applicant(data);
            await applicant.save();
            return res.send(applicant);
        } catch (e) {
            if (e instanceof mongoose.Error.ValidationError) {
                return res.status(422).send(e);
            }

            return next(e);
        }
    },
);

applicantRouter.delete(
    '/:id',
    auth,
    permit('admin', 'superadmin'),
    async (req: RequestWithUser, res, next) => {
        try {
            const applicant = await Applicant.findById(req.params.id);

            if (!applicant) {
                return res.status(400).send({error: 'Applicant does not exist'});
            }

            await Applicant.deleteOne({_id: req.params.id});
            res.send('deleted');
        } catch (error) {
            return next(error);
        }
    },
);

applicantRouter.patch(
    '/:id/activate',
    auth,
    permit('admin', 'superadmin'),
    async (req: RequestWithUser, res, next) => {
        try {
            let _id: Types.ObjectId;
            try {
                _id = new Types.ObjectId(req.params.id);
            } catch {
                return res.status(404).send({error: 'Wrong ObjectId'});
            }

            const applicant = await Applicant.findById(_id);
            if (!applicant) {
                return res.status(404).send({error: 'This applicant does not exist'});
            }

            applicant.isActive = !applicant.isActive;

            await applicant.save();

            return res.send(applicant);
        } catch (error) {
            return next(error);
        }
    },
);
export default applicantRouter;
