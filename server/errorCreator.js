import { faker } from '@faker-js/faker'
import regions from './data/regions.js'


class ErrorCreator {
    constructor(region, countError, seed) {
        this.region = region
        this.countError = countError
        faker.seed(seed)
    }

    start = data => {
        const initLenData = this.saveInitLenFields(data)
        const wholePart = Math.floor(this.countError)
        const fractPart = this.countError - wholePart

        for(let i = 0; i < wholePart; i++) {
            this.changeField(data, initLenData)
        }
        if(faker.datatype.float({ min: 0, max: 1, precision: 0.001 }) < fractPart) {
            this.changeField(data, initLenData)
        }

        return data
    }

    saveInitLenFields = data => {
        const initLenData = {}
        Object.keys(data).forEach(f => {
            initLenData[f] = data[f].length
        })
        return initLenData
    }

    getAllowTypeErrors = (data, field, initLenData) => {
        const typeErrors = [this.createErrorExchangeTwoNearSymbol] 
        if(data[field].length < initLenData[field] * 2) {
            typeErrors.push(this.createErrorAddOneSymbol)
        }
        if(data[field].length > initLenData[field] / 2) {
            typeErrors.push(this.createErrorDeleteOneSymbol)
        }
        return typeErrors
    }

    changeField = (data, initLenData) => {
        const randomField = this.getRandomField(data)
        data[randomField] = this.getRandomElementArray(
            this.getAllowTypeErrors(data, randomField, initLenData)
        )(data[randomField])
    }

    getRandomField = data => this.getRandomElementArray(Object.keys(data))

    createErrorDeleteOneSymbol = valueField => { 
        const randomIndexLetter = this.getRandomInt(0, valueField.length - 1)
        return valueField.slice(0, randomIndexLetter + 1) 
            + valueField.slice(randomIndexLetter + 2, valueField.length)
    }

    createErrorAddOneSymbol = valueField => {
        const randomIndexLetter = this.getRandomInt(0, valueField.length - 1)
        return valueField.slice(0, randomIndexLetter)
            + this.getRandomElementArray(this.getRegionData().alphaNumber) 
            + valueField.slice(randomIndexLetter, valueField.length)
    }

    createErrorExchangeTwoNearSymbol = valueField => {
        const randomIndexLetter = this.getRandomInt(0, valueField.length - 2)
        return valueField.slice(0, randomIndexLetter)
            + valueField[randomIndexLetter + 1]
            + valueField[randomIndexLetter]
            + valueField.slice(randomIndexLetter + 2, valueField.length)
    }

    getRandomElementArray = (array) => array[this.getRandomInt(0, array.length - 1)]

    getRandomInt = (min, max) => faker.datatype.number({min: min, max: max})   

    getRegionData = () => {
        return regions.filter(r => r.code === this.region)[0]
    }
}

export default ErrorCreator