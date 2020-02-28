const server = require('../api/server.js')
const request = require('supertest')
const db = require('../database/dbConfig.js')

describe('jokes router', function() {

    afterEach(async () => {
        await db('users').truncate()
    })

    // **** SECOND TEST SUITE FOR THE JOKES ROUTE *******
    it ('Should return a status of 200', () => {

        return request(server).post('/api/auth/register')
        .send({username:'a', password:'pass'})
        .then((response) => {
            expect(response.status).toBe(201)
            return request(server).post('/api/auth/login')
            .send({username:'a', password:'pass'})
            .then((response) => {
                expect(response.status).toBe(200)
        
                return request(server).get('/api/jokes')
                .set('Authorization', response.body.token)
                .then((response) => {
                    expect(response.status).toBe(200)
                })
            })
        })
    })
    // Second test check what axios is returning
    it ('Should return jokes', () => {

        return request(server).post('/api/auth/register')
        .send({username:'a', password:'pass'})
        .then((response) => {
            expect(response.status).toBe(201)
            return request(server).post('/api/auth/login')
            .send({username:'a', password:'pass'})
            .then((response) => {
                expect(response.status).toBe(200)
        
                return request(server).get('/api/jokes')
                .set('Authorization', response.body.token)
                .then((response) => {
                    console.log("This is the jokes router response:", response.body)
                    expect(response.body.length).toBeGreaterThan(3) 
                })
            })
        })
    })
    it ('be an array with objects that each have a property joke on them', () => {

        return request(server).post('/api/auth/register')
        .send({username:'a', password:'pass'})
        .then((response) => {
            expect(response.status).toBe(201)
            return request(server).post('/api/auth/login')
            .send({username:'a', password:'pass'})
            .then((response) => {
                expect(response.status).toBe(200)
        
                return request(server).get('/api/jokes')
                .set('Authorization', response.body.token)
                .then((response) => {
                    const filtered = response.body.filter(joke => joke.joke === undefined )
                    expect(filtered.length).toBe(0)
                })
            })
        })
    })
})