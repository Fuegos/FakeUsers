import { faker } from '@faker-js/faker'
import regions from './data/regions.js'

class FakeGenerator {
    constructor(region, numPage, seed) {
        this.region = region
        faker.setLocale(region)
        this.seed = Number(numPage) * Math.pow(10, 7) 
            + Number(this.getRegionData(region).seed) * Math.pow(10, 6) 
            + Number(seed)
        faker.seed(this.seed)
    }

    getSeed = () => this.seed

    getFullName = () => {
        const gender = faker.name.gender(true)
        let fullName;
        switch(this.region) {
            case 'uk':
            case 'en_US':
                fullName = `${faker.name.lastName(gender.toLowerCase())} ${faker.name.firstName(gender.toLowerCase())} ${faker.name.middleName(gender.toLowerCase())}`
                break
            case 'ge':
                fullName = `${faker.name.lastName(gender)} ${faker.name.firstName(gender)}`
                break
        }
        return fullName
    }
    
    getAddress = () => {
        return `${faker.address.zipCode()}, ${faker.address.city()}, ${faker.address.streetAddress(true)}`
    }

    getPhone = () => {
        const phoneFormats = this.getRegionData().phoneFormats
        const randomIndex = faker.datatype.number(
            { 
                min: 0, 
                max: phoneFormats.length - 1 
            }
        )
        return faker.phone.phoneNumber(phoneFormats[randomIndex])
    }

    getId = () => {
        return faker.random.numeric(8)
    }

    getRegionData = () => {
        return regions.filter(r => r.code === this.region)[0]
    }
}

export default FakeGenerator