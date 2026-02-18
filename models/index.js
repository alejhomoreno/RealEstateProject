import properties from './properties.js'
import prices from './prices.js'
import tags from './tags.js'
import Usuario from './Usuario.js'

properties.belongsTo(prices, { foreignKey: 'priceId'})
properties.belongsTo(tags, { foreignKey: 'tagId'})
properties.belongsTo(Usuario, { foreignKey: 'usuarioId'})

export {
    properties,
    prices,
    tags,
    Usuario
}
