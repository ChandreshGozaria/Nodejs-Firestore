
const admin = require('firebase-admin');
const credentials = require('../../key.json');

module.exports = admin.initializeApp({
    credential: admin.credential.cert(credentials)
})
