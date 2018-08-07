const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server.js');

const {User} = require('./../models/user');
const {populateTodos} = require('./seeds/seed');

beforeEach(populateTodos);

describe('Post /sms', () => {
    it('should send sms', (done) => {
        var message = 'Your otp is : 123345';
        var phoneNumber = '+919742286152';
        var name = 'akanksha';
        request(app)
        .post('/numbers')
        .send({
         message,
         phoneNumber,
         name
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.message).toBe(message);
            expect(res.body.name).toBe(name);
            expect(res.body.phoneNumber).toBe(phoneNumber);
        })
        .end((err, res) => {
            if(err) {
                return done(err);
            }
            User.find({phoneNumber}).then((todos) => {
                expect(todos[0].name).toBe(name);
                done();
            }).catch((e) => done(e));
        });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
        .post('/numbers')
        .send({})
        .expect(500)
        .end((err, res) => {
            if(err) {
                return done(err);
            }
            User.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e))
        })
    })
});


describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/getInfo')
        .expect(200)
        .expect((res) => {
            expect(res.body.user.length).toBe(2);
        })
        .end(done);
    })
});
