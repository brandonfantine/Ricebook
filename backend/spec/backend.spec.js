// Require the proper dependencies
require('es6-promise').polyfill();
require('isomorphic-fetch');

// Create the path
const url = path => `http://localhost:3000${path}`;
let cookie;
let id = Date.now();
let uniqueUsername = "testUser" + id;

// Perform a sequence of tests related to our testUser object
describe('Tests for our testuser', () => {

    it('Should create a profile for a test user', async (done) => {
        // Declare a newUser object such that it matches the profile schema and includes as password
        let newUser = { username: uniqueUsername, password: '123', email: 'email@email.email', phone: '000-000-0000', zipcode: '00000', dob: Date.now() };

        // Fetch the registration endpoint
        let res = await fetch(url('/register'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        })

        let resJSON = await res.json();

        // Expect the registration endpoint to pass such that the status number shown is 200
        expect(res.status).toBe(200);

        done();
    });

    it('Should log in a registered user', async (done) => {
        // Declare a registeredUser object such that it matches the user schema, with the same username and password as our registered testUser
        let registeredUser = { username: uniqueUsername, password: '123' };

        // Fetch the login endpoint
        let res = await fetch(url('/login'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registeredUser)
        })

        let resJSON = await res.json();

        let sessionKey = res.headers.get('Set-Cookie').split(';')[0].split('=')[1];

        cookie = sessionKey;

        // Expect the registration endpoint to pass such that the status number shown is 200
        expect(res.status).toBe(200);

        done();
    });

    it('Should add a new article', async (done) => {
        // Declare a newArticle object such that it matches the article schema
        let newArticle = { pid: 1, author: 'testUser', text: 'testtext', date: Date.now() };

        // Fetch the article endpoint
        let res = await fetch(url('/article'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Cookie': 'SessionId=' + cookie },
            body: JSON.stringify(newArticle)
        })

        let resJSON = await res.json();

        // Expect the article endpoint to pass such that the status number shown is 200
        expect(res.status).toEqual(200);

        done();
    });

    it('Should update status headline', async (done) => {
        // Declare a newProfile object such that it matches the article schema
        let newProfile = { username: uniqueUsername, password: '123', email: 'email@email.email', phone: '000-000-0000', zipcode: '00000', dob: Date.now(), headline: 'newHeadline' };

        // Fetch the headline endpoint
        let res = await fetch(url('/headline'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Cookie': 'SessionId=' + cookie },
            body: JSON.stringify(newProfile)
        })

        let resJSON = await res.json();

        // Expect the headline endpoint to pass such that the status number shown is 200
        expect(res.status).toEqual(200);

        done();
    });

    it('Should logout the user', async (done) => {

        // Fetch the headline endpoint
        let res = await fetch(url('/logout'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Cookie': 'SessionId=' + cookie },
        })


        // Expect the headline endpoint to pass such that the status number shown is 200
        expect(res.status).toEqual(200);

        done();
    })
});

