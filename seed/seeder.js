import tag from "./tag.js";
import price from "./price.js";
import db from "../config/db.js";
import { tags, prices} from '../models/index.js'

const importData = async () => {
    try {
        await db.authenticate()
        await db.sync()
        await Promise.all([
            tags.bulkCreate(tag),
            prices.bulkCreate(price)
        ])
        console.log('Import Data...')
        exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

const deleteData = async () => {
    try {
        await Promise.all([
            tags.destroy({ where: {}, truncate: true }),
            prices.destroy({ where: {}, truncate: true }),
        ])
        console.log('Data delete...')
        exit()
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

if (process.argv[2] === "-i") {
    importData();
}

if (process.argv[2] === "-e") {
    deleteData();
}