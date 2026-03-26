import { unlink } from 'node:fs/promises'
import { validationResult } from 'express-validator'
import { prices, tags, properties, Message, Usuario } from '../models/index.js'
import { isSeller, formatDate  } from '../helpers/index.js'


const admin = async (req, res) => {

    // read query
    const { pageName: page } = req.query
    const validPages = /[^0-9$]/

    if (validPages.test(page)) {
        return res.redirect('/properties?pageName=1')
    }
    try {
        const { id } = req.client

        const limit = 3
        const offset = ((page * limit) - limit)

        const [propertiesadmin, total] = await Promise.all([

            properties.findAll({
                limit,
                offset,
                where: {
                    usuarioId: id
                },
                include: [
                    { model: tags, as: 'tag' },
                    { model: prices, as: 'price' },
                    { model: Message, as: 'messages' }
                ]
            }),
            properties.count({
                where: {
                    usuarioId: id
                }
            })

        ])

        res.render('properties/admin', {
            pageName: 'My Properties',
            propertiesadmin,
            page: Math.ceil(total / limit),
            pageActual: page,
            total,
            offset,
            limit

        })

    } catch (error) {
        console.log(error)
    }

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

// change status 

const changeStatus = async (req, res) => {
    console.log("changeStatus.......")
    const { id } = req.params

    const property = await properties.findByPk(id)

    if (!property) {
        return res.redirect('/properties')
    }

    if (req.client.id.toString() !== property.usuarioId.toString()) {
        return res.redirect('/properties')

    }
    property.published = !property.published
    await property.save()
    res.json({ result: 'success' })
}

const show = async (req, res) => {
    const { id } = req.params

    const property = await properties.findByPk(id, {
        include: [
            { model: tags, as: 'tag' },
            { model: prices, as: 'price' }
        ]
    })

    if (!property) {
        return res.redirect('/404')
    }




    let isUserSeller = false;

    if (req.user) {
        console.log("My User ID is:", req.user.id);
        console.log("The Property's User ID is:", property.usuarioId);

        isUserSeller = isSeller(req.user?.id, property.usuarioId);
    }

    console.log("Is the current user the seller?", isUserSeller);

    res.render('properties/show', {
        pageName: 'Property Detail',
        property,
        user: req.user,
        isSeller: isUserSeller
    })
}

const sendMessage = async (req, res) => {
    const { id } = req.params

    const property = await properties.findByPk(id, {
        include: [
            { model: tags, as: 'tag' },
            { model: prices, as: 'price' }
        ]
    })

    if (!property) {
        return res.redirect('/404')
    }

    let result = validationResult(req);


    if (!result.isEmpty()) {


        return res.render('properties/show', {
            pageName: 'Property Detail',
            property,
            user: req.user,
            isSeller: isSeller(req.user?.id, property.usuarioId),
            errors: result.array()
        })
    }

    const { message } = req.body;
    const { id: usuarioId } = req.user;
    const { id: propertyId } = req.params;

    await Message.create({
        message,
        usuarioId,
        propertyId
    })

    res.redirect('/')
}
const viewsMessage = async (req, res) => {
    const { id } = req.params;

    const property = await properties.findByPk(id, {
        include: [
            {
                model: Message, as: 'messages',
                include: [
                    { model: Usuario },
                ]
            }
        ],
    })
    if (!property) {
        return res.redirect('/properties');
    }

    // 1. Let's print the values to the terminal to see what is missing!
    console.log("User ID is:", req.user?.id); // Try checking req.user instead!
    console.log("Client ID is:", req.client?.id);
    console.log("Property UsuarioId is:", property.usuarioId);

    // 2. Safely check the IDs (assuming your middleware uses req.user)
    // Optional chaining (?) prevents the app from crashing if the object is missing
    if (req.user?.id.toString() !== property.usuarioId?.toString()) {
        return res.redirect('/properties');
    }

    res.render('properties/messages', {
        pageName: 'Messages',
        property,
        formatDate
    });
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
    changeStatus,
    show,
    sendMessage,
    viewsMessage
}
