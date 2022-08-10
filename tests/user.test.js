const request = require('supertest')
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose')
const app = require('../src/app')
const mailService = require('../src/services/mail')
const userService = require('../src/services/users')
// jest.setTimeout(10000000)
// server = app.listen(app.get('port'), () => {

// })

beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})



afterAll(async () => {
     /**close allthe db connections after a test */
    await mongoose.disconnect()
    await mongoose.connection.close()
    // server.close(() => {});
})

describe('user service ', () => {
    // describe('register a user', ()=> {
    //     it('ensure fistname is provided', async () => {
    //         await request(app).post('/api/users/auth/register').send({
    //             firstname: 'arah'
    //         }).expect(500)
    //     })
    // })  // describe('register a user', ()=> {
    //     it('ensure fistname is provided', async () => {
    //         await request(app).post('/api/users/auth/register').send({
    //             firstname: 'arah'
    //         }).expect(500)
    //     })
    // })       

    describe('register a user', ()=> {
        it('ensure fistname is provided', async () => {
            
            const createUserMock = jest.spyOn(userService, 'createUser').mockReturnValueOnce({

            })
            const sendUserActivationEmailMock =  jest.spyOn(mailService, 'sendUserActivationEmail').mockReturnValueOnce()
            // await request(app).post('/api/users/auth/register').send({
            //     firstname: 'arah',
            //     lastname: 'paul',
            //     email: 'nodejs.aolvit@gmail.com',
            //     password:'yeurhmmriri'
            // }).expect(201)
            await userService.createUser({firstname:'paul', lastname:'arah', password:'ee8r8r8r8r', emial:'arah@gmail.com'})

            expect(createUserMock).toHaveBeenCalled()
            // expect(sendUserActivationEmailMock).toHaveBeenCalled()
        })
    })    
    
})

