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
      const modelName = modelMapping[block.nameComponent];

      if (modelName) {
        const componentInstance = new modelMapping[block.nameComponent](block.content);
        const id = await componentInstance.save();
        newPage.componentType.push(block.nameComponent);
        newPage.components.push(id._id);
        await componentInstance.save();
      } else {
        return res.status(422).send({
          error: 'No such components',
          missingComponents: blocks.filter((block) => !modelMapping[block.nameComponent]),
        });
      }
    }

    const newPageModel = new Page(newPage);
    await newPageModel.save();

    res.status(200).send({ message: 'Page created successfully', id: newPageModel._id });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

pageCreateRouter.get('/', async (req, res, next) => {
  try {
    const crmAllPages = req.query.crmPages;

    if (crmAllPages) {
      const pages = await Page.find().select('_id name url').sort({ createdAt: -1 });
      return res.send(pages);
    }

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

interface UpdatedPage {
  name: string;
  url: string;
  components: Types.ObjectId[];
  componentType: string[];
}

pageCreateRouter.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, url } = req.body;

    const updatedPage: UpdatedPage = {
      name,
      url,
      components: [],
      componentType: [],
    };

    let blocks: Block[] = req.body.blocks;

    const existingPage = await Page.findById(id);
    if (!existingPage) {
      return res.status(404).send({ error: 'Page not found' });
    }

    for (const block of blocks) {
      const modelName = modelMapping[block.nameComponent];

      if (!modelName) {
        return res.status(404).send({ error: 'Model not found!' });
      }

      if (block.content['_id']) {
        await modelMapping[block.nameComponent].findByIdAndDelete(block.content['_id']);
        delete block.content['_id'];
      }
    }

    for (const block of blocks) {
      const modelName = modelMapping[block.nameComponent];

      if (modelName) {
        const componentInstance = new modelMapping[block.nameComponent](block.content);
        const id = await componentInstance.save();
        updatedPage.componentType.push(block.nameComponent);
        updatedPage.components.push(id._id);
        await componentInstance.save();
      } else {
        return res.status(422).send({
          error: 'No such components',
          missingComponents: blocks.filter((block) => !modelMapping[block.nameComponent]),
        });
      }
    }

    await Page.updateOne({ _id: id }, updatedPage);

    res.status(200).send({ message: 'Page updated successfully' });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

pageCreateRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const existingPage = await Page.findById(id);
    if (!existingPage) {
      return res.status(404).send({ error: 'Page not found' });
    }

    for (const components of existingPage.componentType) {
      await modelMapping[components.toLocaleLowerCase()].findByIdAndDelete();
    }

    for (let i = 0; i < existingPage.componentType.length; i++) {
      const components = existingPage.componentType[i];
      await modelMapping[components.toLocaleLowerCase()].findByIdAndDelete(existingPage.components[i]);
    }

    await Page.deleteOne({ _id: id });
    return res.status(200).send({ message: 'Page deleted successfully' });
  } catch (e) {
    next(e);
  }
});

export default pageCreateRouter;
