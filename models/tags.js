import { DataTypes } from "sequelize"
import db from '../config/db.js'

const tags= db.define('tags',{
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
});

export default tags