import { properties, prices, tags } from '../models/index.js';

const propertiesall  = async (req, res) => {

    const property = await properties.findAll({
        include: [
            { model: prices, as: 'price'},
            { model: tags, as: 'tag'},
        ]
    })

    res.json(property)
}

export {
    propertiesall
}       