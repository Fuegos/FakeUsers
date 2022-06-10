import express from 'express'
import path from 'path'
import FakeGenerator from './fakeGenerator.js'
import ErrorCreator from './errorCreator.js'
import regions from './data/regions.js'
import { writeToString } from '@fast-csv/format'

const app = express()
const router = express.Router()
const __dirname = path.resolve()

app.use("/", router)
app.use(express.static(path.join(__dirname, "../client", "build")))

const PORT = process.env.PORT || 5000;

const createUsers = (count, region, countError, numPage, seed) => {
    const users = []
    const faker = new FakeGenerator(
        region, 
        numPage, 
        seed
    )
    const errorCreator = new ErrorCreator(
        region,
        countError,
        faker.getSeed()
    )

    for(let i = 0; i < count; i++){
        users.push({
            _id: faker.getId(),
            fullName: faker.getFullName(),
            address: faker.getAddress(),
            phone: faker.getPhone()
        })
    }

    return users.map(u =>
        errorCreator.start(u)
    )
}

router.get('/api/users', (req, res) => {
    res.json(
        createUsers(
            req.query.count, 
            req.query.region, 
            req.query.countError, 
            req.query.numPage, 
            req.query.seed
        )
    )
})

router.get('/api/users/csv', (req, res) => {
    const users = [
        ...createUsers(20, req.query.region, req.query.countError, 0, req.query.seed)
    ]
    for(let i = 1; i < req.query.numPage; i++) {
        users.push(
            ...createUsers(10, req.query.region, req.query.countError, i, req.query.seed)
        )
    }
    writeToString(users, { headers: true }).then(data => {
        res.json(data)
    })
})

router.get('/api/regions', (req, res) => {
    res.json(regions)
})

app.listen(PORT, () => console.log("server was running"))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"))
})