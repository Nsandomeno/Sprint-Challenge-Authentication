const server = require('../api/server.js')
const request = require('supertest')
const db = require('../database/dbConfig.js')

describe('auth router', function() {



        beforeEach(async () => {
            await db('users').truncate()
        })
        // ***** TESTS 1-3 : REGISTER ENDPOINT IN AUTH ROUTER *******
        it('Should return a status code 201', () => {
            return request(server).post('/api/auth/register')
            .send({username:'z', password:'pass'})
            .then((response) => {
                expect(response.status).toBe(201)
            })
        })
        it('Should return a JSON object', () => {
            return request(server).post('/api/auth/register')
            .send(({username:'y', password:'pass'}))
            .then((response) => {
                expect(response.type).toBe('application/json')
            })
        })
        it('Should return a message that includes the phrase: "registered', () => {
            return request(server).post('/api/auth/register')
            .send({username:'z', password:'pass'})
            .then((response) => {
                expect(response.text).toContain('Registered')
            })
        })
        // **** TESTS 4-6 LOGIN ENDPOINT IN AUTH ROUTER ********
        it ('Should return a status 200', () => {
            return request(server).post('/api/auth/register')
            .send({username:'a', password:'pass'})
            .then((response) => {
                expect(response.status).toBe(201)
                return request(server).post('/api/auth/login')
                .send({username:'a', password:'pass'})
                .then((response) => {
                    // console.log("This is the rest response:", response.body)
                    expect(response.status).toBe(200)
                })
            })
        })
        it ('Should return a token with a length greater than 15', () => {
            return request(server).post('/api/auth/register')
            .send({username:'a', password:'pass'})
            .then((response) => {
                expect(response.status).toBe(201)
                return request(server).post('/api/auth/login')
                .send({username:'a', password:'pass'})
                .then((response) => {
                    expect(response.body.token.length).toBeGreaterThan(20)
                })
            })
        })
        it ('Should include the word "welcome" in the message', () => {
            return request(server).post('/api/auth/register')
            .send({username:'g', password:'pass'})
            .then((response) => {
                expect(response.status).toBe(201)
                return request(server).post('/api/auth/login')
                .send({username:'g', password:'pass'})
                .then((response) => {
                    expect(response.body.message).toContain('Welcome')
                })
            })
        })
})