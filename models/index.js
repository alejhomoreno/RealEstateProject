import properties from './properties.js'
import prices from './prices.js'
import tags from './tags.js'
import Usuario from './Usuario.js'
import Message from './Message.js'

properties.belongsTo(prices, { foreignKey: 'priceId'})
properties.belongsTo(tags, { foreignKey: 'tagId'})
properties.belongsTo(Usuario, { foreignKey: 'usuarioId'})

// 1. Property has many Messages
properties.hasMany(Message, { foreignKey: 'propertyId', as: 'messages' })

// 2. Message belongs to a User (Usuario)
Message.belongsTo(Usuario, { foreignKey: 'usuarioId' })

// 3. Message belongs to a Property
Message.belongsTo(properties, { foreignKey: 'propertyId' })

export {
    properties,
    prices,
    tags,
    Usuario,
    Message
}