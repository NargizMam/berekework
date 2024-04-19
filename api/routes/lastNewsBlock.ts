import express from 'express';
import mongoose, {Types} from 'mongoose';
import LastNewsBlock from "../models/LastNewsBlock";


const lastNewsBlockRouter = express.Router();

lastNewsBlockRouter.get('/', async (req, res, next) => {
    try {
        const pageId = req.query.pageId;

        const blocks = await LastNewsBlock.find({page: pageId});

        return res.send(blocks);
    } catch (e) {
        return next(e);
    }
});

lastNewsBlockRouter.get('/:id', async (req, res, next) => {
    try {
        let _id: Types.ObjectId;
        try {
            _id = new Types.ObjectId(req.params.id);
        } catch {
            return res.status(404).send({error: 'Wrong ObjectId'});
        }

        const block = await LastNewsBlock.findById(_id)
        return res.send(block);
    } catch (e) {
        return next(e);
    }
});

lastNewsBlockRouter.post('/', async (req, res, next) => {
        try {
            const id = req.query.id;
            const { title, page, cards } = req.body;

            if (id) {
                const updatedBlock = await LastNewsBlock.findOneAndUpdate(
                    { _id: id },
                    { title, page, cards },
                    { new: true }
                );
                return res.send(updatedBlock);
            } else {
                const data = {
                    id: req.body.id,
                    title: req.body.title,
                    page: req.body.page,
                    cards: req.body.cards,
                };

                const newBlock = new LastNewsBlock(data);
                await newBlock.save();
                return res.send(newBlock);
            }

        } catch (e) {
            if (e instanceof mongoose.Error.ValidationError) {
                return res.status(422).send(e);
            }

            return next(e);
        }
    },
);

lastNewsBlockRouter.delete('/:id', async (req, res, next) => {
    try {
        const block = await LastNewsBlock.findById(req.params.id);

        if (!block) {
            return res.status(400).send({error: 'This block does not exist'});
        }

        await LastNewsBlock.deleteOne({_id: req.params.id});
        res.send('deleted');
    } catch (error) {
        return next(error);
    }
});

export default lastNewsBlockRouter;
