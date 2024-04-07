import express from "express"
import db from "../db/conn.mjs"
import { ObjectId } from "mongodb"


const router = express.Router()


// Data for restaurants collection
const restaurantSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["address", "borough", "cuisine", "grades", "name", "restaurant_id"],
        properties: {
            address: {
                building: {
                    bsonType: "string",
                    description: "must be a string"
                },
                coord: {
                    0: "number",
                    1: "number",
                    description: "must be a number"
                },
                street: {
                    bsonType: "string",
                    description: "must be an string"
                },
                zipcode: {
                    bsonType: "number",
                    description: "must be a number"
                }
            },
            borough: {
                bsonType: "string",
                description: "must be a string"
            },
            cuisine: {
                bsonType: "string",
                description: "must be a string"
            },
            grades: {
                0: {
                    bsonType: "date",
                    grade: "string",
                    score: "number",
                    description: "must contain a date, string and number"
                },
                1: {
                    bsonType: "date",
                    grade: "string",
                    score: "number",
                    description: "must contain a date, string and number"
                },
                2: {
                    bsonType: "date",
                    grade: "string",
                    score: "number",
                    description: "must contain a date, string and number"
                },
                3: {
                    bsonType: "date",
                    grade: "string",
                    score: "number",
                    description: "must contain a date, string and number"
                }
            },
            name: {
                bsonType: "string",
                description: "must be a string"
            },
            restaurant_id: {
                bsonType: "number",
                description: "must be a number"
            }
        }
    }
};




router.get('/', async (req, res) => {
    const collection = await db.collection("restaurants")
    const results = await collection.find({}).limit(20).toArray()
    res.send(results).status(200)
})

router.get('/:id', async (req, res) => {
    const collection = await db.collection('restaurants')
    let query = { _id: new ObjectId(req.params.id) }
    const result = await collection.findOne(query)


    if (!result)
        res.send('Data Not Found').status(404)
    else res.send(result).status(200)
})

router.post('/', async (req, res) => {
    const collection = await db.collection('sales', { validator: restaurantSchema })
    const newDocument = req.body
    newDocument.date = new Date()
    const result = await collection.insertOne(newDocument)

    res.send(result).status(204)
})

router.patch('/:id', async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    const updates = {
        $set: req.body
    }

    const collection = await db.collection('sales', { validator: restaurantSchema })
    const result = await collection.updateOne(query, updates);

    if (!result)
        res.send('Data Not Found').status(404)
    else res.send(result).status(200)

});



router.delete('/:id', async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    const collection = db.collection('sales')
    const result = await collection.deleteOne(query)

    if (!result)
        res.send('Data Not Found').status(404)
    else res.send(result).status(200)

})

export default router;