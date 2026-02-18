import { doubleCsrf } from 'csrf-csrf'
import prices from '../models/prices.js'
import tags from '../models/tags.js'
import { validationResult } from 'express-validator'

const admin = (req, res) => {
    res.render('properties/admin', {
        pageName: 'My Properties',
        barra: true
    })
}

const create = async (req, res) => {

    const [tag, price] = await Promise.all([
        tags.findAll(),
        prices.findAll()
    ])

    res.render('properties/create', {
        pageName: 'Create Property',
        barra: true,
        tag,
        price
    })
}

const save = async (req, res) => {
    let result = validationResult(req)
    if (!result.isEmpty()) {
        const [tag, price] = await Promise.all([
            tags.findAll(),
            prices.findAll()
        ])
        res.render('properties/create', {
            pageName: 'Create Property',
            barra: true,
            tag,
            price,
            errors: result.array()
            
        })
    }
}

export {
    admin,
    create,
    save
}