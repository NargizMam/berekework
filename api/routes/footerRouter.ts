import express from 'express';
import Footer from '../models/footer/Footer';
import config from "../config";
import {logoFooterUpload} from "../multer";
import {readdirSync, unlink} from 'node:fs';
import {resolve} from 'node:path';

const footerRouter = express.Router();

footerRouter.post('/', async (req, res, next) => {
    try {
        const {footerLinks, socialNetworks, contactDetails, logo, copyright} = req.body;

        let existingFooter = await Footer.findOne();

        if (existingFooter) {
            await Footer.findByIdAndDelete(existingFooter._id);
        }

        const newFooter = new Footer({footerLinks, logo, socialNetworks, contactDetails, copyright});

        await newFooter.save();

        return res.send(newFooter);
    } catch (error) {
        console.log(error);
        next(error);
    }
});


footerRouter.get('/', async (_req, res) => {
    try {
        const result = await Footer.find();
        return res.send(result);

    } catch (error) {
        return res.sendStatus(500);
    }
});

footerRouter.post('/new-links', async (req, res, next) => {
    try {
        const existingFooters = await Footer.find();

        const totalFooterLinks = existingFooters.reduce((total, footer) => total + footer.footerLinks.length, 0);

        if (totalFooterLinks >= 5) {
            return res.status(400).send("Cannot add more than 5 footer links");
        }

        const {title, links} = req.body;
        console.log('REQ BODY: ')
        console.dir(req.body, {depth: null, maxArrayLength: null})

        const existingFooter = existingFooters[0];

        if (!existingFooter) {
            const newFooter = new Footer({
                footerLinks: [{title, links}],
            });

            await newFooter.save();
            return res.send(newFooter);
        }

        existingFooter.footerLinks.push({title, links});
        await existingFooter.save();

        return res.send(existingFooter);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

footerRouter.post('/new-contacts-block', async (req, res, next) => {
    try {
        const existingFooters = await Footer.find();

        const totalContactDetails = existingFooters.reduce((total, footer) => total + footer.contactDetails.length, 0);

        if (totalContactDetails >= 1) {
            return res.status(400).send("you cannot add more than one contact block");
        }

        const {title, contactsDetailsArr} = req.body;

        const existingFooter = existingFooters[0];

        if (!existingFooter) {
            const newFooter = new Footer({
                contactDetails: [{title, contactsDetailsArr}],
            });

            await newFooter.save();
            return res.send(newFooter);
        }

        existingFooter.contactDetails.push({title, contactsDetailsArr});
        await existingFooter.save();

        return res.send(existingFooter);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

footerRouter.delete('/footerLinks/:linkId', async (req, res, next) => {
    try {
        const {linkId} = req.params;

        const existingFooter = await Footer.findOne({'footerLinks._id': linkId});

        if (!existingFooter) {
            return res.status(404).send("Footer not found");
        }

        const linkIndex = existingFooter.footerLinks.findIndex(link => link._id && link._id.toString() === linkId);

        if (linkIndex === -1) {
            return res.status(404).send("Footer link not found");
        }

        existingFooter.footerLinks.splice(linkIndex, 1);

        await existingFooter.save();

        return res.send("Footer link deleted successfully");
    } catch (error) {
        console.error('Error deleting footer link:', error);
        next(error);
    }
});

footerRouter.delete('/contactBlock/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const existingFooter = await Footer.findOne({'contactDetails._id': id});

        if (!existingFooter) {
            return res.status(404).send("Footer not found");
        }

        const contactBlockIndex = existingFooter.contactDetails.findIndex(block => block._id && block._id.toString() === id);

        if (contactBlockIndex === -1) {
            return res.status(404).send("Contact block not found");
        }

        existingFooter.contactDetails.splice(contactBlockIndex, 1);

        await existingFooter.save();

        return res.send("Contact block deleted successfully");
    } catch (error) {
        console.error('Error deleting contact block:', error);
        next(error);
    }
});

footerRouter.post('/new-copyright', async (req, res, next) => {
    try {
        const existingFooter = await Footer.findOne();
        const footerCopyright = existingFooter?.copyright;

        if (footerCopyright) {
            return res.status(400).send('Копирайт уже существует в футере');
        }

        const {text} = req.body;

        if (!text || text.trim() === '') {
            return res.status(400).send('Текст копирайта не может быть пустым');
        }

        existingFooter!.copyright = text;
        await existingFooter!.save();

        return res.status(201).send(existingFooter);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

footerRouter.delete('/delete-copyright', async (_req, res, next) => {
    try {
        const existingFooter = await Footer.findOne();
        const footerCopyright = existingFooter?.copyright;

        if (!footerCopyright) {
            return res.status(404).send('Копирайт не найден в футере');
        }

        await existingFooter!.updateOne({$unset: {copyright: 1}});

        return res.status(200).send('Копирайт успешно удален из футера');
    } catch (error) {
        console.log(error);
        next(error);
    }
});

footerRouter.post('/logo', logoFooterUpload.single('logo'), async (req, res, next) => {
    try {
        const footer = await Footer.findOne();

        if (!footer) {
            return res.status(404).send({error: 'Footer not found'});
        }

        if (!req.file) {
            return res.status(400).send({error: 'Логотип не загружен'});
        }

        const logoFolderPath = resolve(config.publicPath, 'logoFooter');

        const files = readdirSync(logoFolderPath);

        if (footer.logo && files.length > 1) {
            unlink(resolve(logoFolderPath, req.file.filename), (e) => {
                if(e) {
                    return res.status(500).send({error: 'Не удалось удалить файл логотипа'});
                }
            });
            return res.status(400).send({error: 'У вас уже присутствует логотип. Удалите предыдущий перед тем как добавить новый.'});
        }

        footer.logo = req.file.filename;
        const updatedFooter = await footer.save();

        return res.send(updatedFooter);
    } catch (error) {
        next(error);
    }
});


footerRouter.delete('/logo', async (_req, res, next) => {
    try {
        const footer = await Footer.findOne();

        if (!footer) {
            return res.status(404).send({error: 'Footer not found'});
        }

        if (footer.logo) {
            const logoPath = resolve(config.publicPath, 'logoFooter', footer.logo);

            unlink(logoPath, (err: any) => {
                if (err) {
                    return res.status(500).send({error: 'Не удалось удалить файл логотипа'});
                }

                footer.logo = undefined;

                footer.save()
                    .then(() => {
                        return res.send({message: 'Логотип успешно удален'});
                    })
                    .catch((_error) => {
                        return res.status(500).send({error: 'Не удалось обновить колонтитул документа'});
                    });
            });
        } else {
            return res.status(404).json({error: 'Логотип не неайден'});
        }
    } catch (error) {
        next(error);
    }
});


export default footerRouter;