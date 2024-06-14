import mongoose from 'mongoose';
import {Router} from 'express';
import {imagesUpload} from '../multer';
import permit from '../middleware/permit';
import User from "../models/users/userModel";
import auth from "../middleware/auth";


const moderatorRouter = Router();

moderatorRouter.post('/', auth,  permit('superadmin'), imagesUpload.single('avatar'), async (req, res, next) => {

    try{
        const moderator = new User({
            displayName: req.body.displayName,
            email: req.body.email,
            password: req.body.password,
            role: 'admin',
        });
        moderator.generateToken();
        await moderator.save();
        return res.send({ message: 'Администратор успешно создан!', moderator });
    }catch(e){
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }
        return next(e);
    }

});



moderatorRouter.get('/',auth,  permit('superadmin'), async (req , res, next) => {
    try {

            const moderators = await User.find({ role: 'admin' });
            return res.send(moderators);
          } catch (error) {
        return next(error);
    }
});



moderatorRouter.delete('/:id',auth, permit('superadmin') , async (req, res, next) => {
        try {
            const deletedModerator = await User.findByIdAndDelete(req.params.id);
            if (!deletedModerator) {
                return res.send({ text: 'Пользователь не найден!' });
            }
            return res.send({ text: 'Администратор успешно удален!' });
        } catch (e) {
            return next(e);
        }
});

export default moderatorRouter;
