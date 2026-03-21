import {unlink } from 'node:fs/promises'
import { validationResult } from 'express-validator'
import { prices, tags, properties } from '../models/index.js'


const admin = async (req, res) => {

    const { id } = req.client
    const propertiesadmin = await properties.findAll({
        where: {
            usuarioId: id
        },
        include: [
            { model: tags, as: 'tag' },
            { model: prices, as: 'price' }
        ]
    })

    res.render('properties/admin', {
        pageName: 'My Properties',
        properties: propertiesadmin
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


    if (!result.isEmpty()) {
        const [tag, price] = await Promise.all([
            tags.findAll(),
            prices.findAll()
        ]);


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
    try {
        property.img = req.file.filename
        property.published = 1
        await property.save()
        res.status(200).send({ message: 'Success' })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Server Error' })
    }
}

const edit = async (req, res) => {
    const { id } = req.params
    const property = await properties.findByPk(id)
    if (!property) {
        return res.redirect('/properties')
    }
    if (req.client.id.toString() !== property.usuarioId.toString()) {
        return res.redirect('/properties')
    }
    const [tag, price] = await Promise.all([
        tags.findAll(),
        prices.findAll()
    ])

    res.render('properties/edit', {
        pageName: `Edit Property: ${property.title}`,
        tag,
        price,
        datos: property
    })
}

const saveChanges = async (req, res) => {

    let result = validationResult(req)

    if (!result.isEmpty()) {
        const [tag, price] = await Promise.all([
            tags.findAll(),
            prices.findAll()
        ])

        return res.render('properties/edit', {
            pageName: 'Edit Property',
            tag,
            price,
            errors: result.array(),
            datos: req.body
        })

    }

    const { id } = req.params

    const property = await properties.findByPk(id)

    if (!property) {
        return res.redirect('/properties')
    }

    if (req.client.id.toString() !== property.usuarioId.toString()) {
        return res.redirect('/properties')

    }
    
    try {
        const { title, description, bedrooms, garage, wc, calle, lat, lng, prices: priceId, tags: tagId } = req.body
        
        const { id: usuarioId } = req.client

        property.set({
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
        })
        await property.save()
        res.redirect('/properties')
     } catch (error) {
        console.log(error)
    }

}

const delet = async (req, res) => {
    const { id } = req.params

    const property = await properties.findByPk(id)

    if (!property) {
        return res.redirect('/properties')
    }

    if (req.client.id.toString() !== property.usuarioId.toString()) {
        return res.redirect('/properties')

    }

    await unlink(`public/uploads/${property.img}`)
    console.log('Image deleted successfully')  

    await property.destroy()
    res.redirect('/properties')
}

const show = async (req, res) => {
    const { id } = req.params

    const property = await properties.findByPk(id,{
            include: [
                {model: tags, as: 'tag'},
                {model: prices, as: 'price'}
            ]
    })

    if (!property) {
        return res.redirect('/404')
    }
    res.render('properties/show', {
        pageName: 'Property Detail',
        property
    })

}

export {
    admin,
    create,
    save,
    getImage,
    storeImage,
    edit,
    saveChanges,
    delet,
    show
}
