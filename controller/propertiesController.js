import { validationResult } from 'express-validator'
import { prices, tags, properties } from '../models/index.js'


const admin = (req, res) => {
    res.render('properties/admin', {
        pageName: 'My Properties',
    })
}

const create = async (req, res) => {

    const [tag, price] = await Promise.all([
        tags.findAll(),
        prices.findAll()
    ])

    res.render('properties/create', {
        pageName: 'Create Property',
        tag,
        price,
        datos: {}
    })
}

const save = async (req, res) => {
    let result = validationResult(req);

    // 1. Check for validation errors
    if (!result.isEmpty()) {
        const [tag, price] = await Promise.all([
            tags.findAll(),
            prices.findAll()
        ]);

        // BUG FIX 1: Add 'return' here to stop the function!
        return res.render('properties/create', {
            pageName: 'Create Property',
            tag,
            price,
            errors: result.array(),
            datos: req.body
        });
    }
    const { title, description, bedrooms, garage, wc, calle, lat, lng, prices: priceId, tags: tagId } = req.body
    const { id: usuarioId } = req.client

    try {
        const propertiesSave = await properties.create({
            title,
            description,
            bedrooms,
            garage,
            wc,
            calle,
            lat,
            lng,
            priceId,
            tagId,
            usuarioId,
            img: ''
        })
        const { id } = propertiesSave
        // Use backticks instead of single quotes!
        res.redirect(`/properties/get-image/${id}`)
    } catch (error) {
        console.log(error)
    }
}

const getImage = async (req, res) => {

    const { id } = req.params
    const property = await properties.findByPk(id)
    if (!property) {
        return res.redirect('/properties')
    }

    if (property.published) {
        return res.redirect('/properties')
    }

    if (req.client.id.toString() !== property.usuarioId.toString()) {
        return res.redirect('/properties')
    }

    res.render('properties/get-image', {
        pageName: `Add Image: ${property.title}`,
        property
    })
}

const storeImage = async (req, res, next) => {
    const { id } = req.params;

    try {
        const property = await properties.findByPk(id);
        if (!property) {
            return res.redirect('/properties');
        }

        if (req.client.id.toString() !== property.usuarioId.toString()) {
            return res.redirect('/properties');
        }

        // Save the image filename to the database
        property.img = req.file.filename;
        property.published = 1; 

        await property.save();

        res.status(200).send('Success');

    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
}



export {
    admin,
    create,
    save,
    getImage,
    storeImage
}