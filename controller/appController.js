import { raw } from 'express'
import { Sequelize, where } from 'sequelize';
import { prices, tags, properties } from '../models/index.js';

const home = async (req, res) => {

    const [tagsList, pricesList, Houses, apartament] = await Promise.all([
        tags.findAll({ raw: true }),
        prices.findAll({ raw: true }),
        properties.findAll({
            limit: 3,
            where: {
                tagId: 16
            },
            include: [
                {
                    model: prices, as: 'price'
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ],
            raw: true, // FIX 2: Added this back so images work!
            nest: true

        }),
        properties.findAll({
            limit: 3,
            where: {
                tagId: 17
            },
            include: [

                { model: prices, as: 'price' }
            ],
            order: [['createdAt', 'DESC']],
            raw: true, // FIX 2: Added this back so images work!
            nest: true
        })
    ]);

    res.render('home', {
        pageName: 'Home',
        tags: tagsList,
        prices: pricesList,
        Houses,
        apartament
    });
}


const getPropertiesByTag = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    const tag = await tags.findByPk(id);

    if (!tag) {
        return res.redirect('/404');
    }

    const propertiesList = await properties.findAll({
        where: {
            tagId: id
        },
        include: [
            { model: prices, as: 'price' }
        ],
        raw: true,
        nest: true
    });

    res.render('tags', {
        pageName: `${tag.name}s for Sale`,
        properties: propertiesList
    });
}

const page404 = (req, res) => {
    res.render('404', {
        pageName: 'Page Not Found'
    });
}

const search = async (req, res) => {

    const { term } = req.body;
    if (!term) {
        return res.redirect('back');
    }

    const propertiesList = await properties.findAll({
        where: {
            title: {
                [Sequelize.Op.like]: `%${term}%`
            }
        },
        include: [
            { model: prices, as: 'price' }
        ],
        raw: true,
        nest: true
    })
    res.render('search', {
        pageName: `Search results for "${term}"`,
        properties: propertiesList
    })
}

export {
    home,
    getPropertiesByTag,
    page404,
    search
}