import { DataTypes } from "sequelize"
import db from '../config/db.js'

const price= db.define('price',{
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
});

export default price
