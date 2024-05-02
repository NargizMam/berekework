import express from 'express';
import { Types } from 'mongoose';
import { Block } from '../types';
import Page from '../models/page/Page';
import { modelMapping } from '../helpers/componentsMapping';

const pageCreateRouter = express.Router();

pageCreateRouter.post('/', async (req, res, next) => {
  try {
    const { name, url } = req.body;

    const newPage = {
      name,
      url,
      components: <Types.ObjectId[]>[],
      componentType: <string[]>[],
    };

    const blocks: Block[] = req.body.blocks;

    for (const block of blocks) {
      const modelName = modelMapping[block.nameComponent.toLocaleLowerCase()];

      if (modelName) {
        const componentInstance = new modelMapping[block.nameComponent.toLocaleLowerCase()](block.content);
        const id = await componentInstance.save();
        newPage.componentType.push(block.nameComponent);
        newPage.components.push(id._id);
        await componentInstance.save();
      } else {
        return res.status(422).send({ error: 'No such components', missingComponents: blocks.filter(block => !modelMapping[block.nameComponent]) });
      }
    }

    const newPageModel = new Page(newPage);
    await newPageModel.save();

    res.status(200).send({message: 'Page created successfully', id: newPageModel._id});
  } catch (e) {
    console.log(e);
    next(e);
  }
});

pageCreateRouter.get('/', async (_req, res, next) => {
  try {
    const pages = await Page.find().populate('components');
    return res.send(pages);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

pageCreateRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const page = await Page.findById(id).select('-__v').populate('components');
    return res.send(page);
  } catch (e) {
    next(e);
  }
});

export default pageCreateRouter;