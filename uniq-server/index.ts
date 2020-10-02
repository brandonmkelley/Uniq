
import * as express from "express"

const app = express()

import { createServer as createHTTPServer } from 'http'
import { createServer as createHTTPSServer } from 'https'
import * as fs from 'fs'

// Read -p argument to deploy prod
var server = null;
var port = null;

var pathIndex = process.argv.indexOf('-p')
var prod = pathIndex !== -1

if (prod) {
    const httpsOptions = {
        key: fs.readFileSync('private.key'),
        cert: fs.readFileSync('certificate.crt'),
        ca: fs.readFileSync('ca_bundle.crt')
    }
    
    server = createHTTPSServer(httpsOptions, app)
    port = 4430
}

else {
    server = createHTTPServer(app)
    port = 8080
}

// Read -s argument if static files need to be served (prod only.)
pathIndex = process.argv.indexOf('-s')

if (pathIndex !== -1 && process.argv.length > pathIndex + 1) {
    var staticPath = process.argv[pathIndex + 1];
    app.use(express.static(staticPath))
}


import * as socketio from 'socket.io'
const io = socketio(server)

import * as mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/uniq', { useNewUrlParser: true, useUnifiedTopology: true })

const userSchema = new mongoose.Schema({
    email: String
})

const User = mongoose.model('user', userSchema)

const db = mongoose.connection

import * as expressSession from 'express-session'
import * as socketSession from 'express-socket.io-session'
import * as mongoSession from 'connect-mongo'

const mongoStore = mongoSession(expressSession)

const appSession = expressSession({
    store: new mongoStore({
        mongooseConnection: db
    }),
    secret: 'foo',
    resave: true,
    saveUninitialized: true
})

app.use(appSession)

io.use(socketSession(appSession))

db.on('error', console.error.bind(console, 'Mongo connection error:'));

/*
// Test connection
db.once('open', function() {
  // we're connected!
    console.log('connected')

    User.find((err: any, users: any) => console.log(users))

    User.watch().on('change', console.log)
});
*/

var firebaseAdmin = require('firebase-admin');

var firebaseAdminRef = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert('./firebaseServiceAccount.json'),
    databaseURL: 'https://userportal-fa7ab.firebaseio.com'
  }, 'ADMIN');

io.on('connection', (socket: any) => {
/*
    socket.on('write-user', (user: any) =>
        User.findById(user._id, (err: any, doc: mongoose.Document) => {
            doc.set('email', user.email)
            doc.save()
        }))
*/
    socket.on('read-page-app', (context) => {
        if (context && context.sid)
            firebaseAdminRef.auth().verifyIdToken(context.sid)
                .then(decoded => {
                    //console.log(decoded)

                    User.find((err: any, users: any) => socket.emit('read-env-list', users))
                })
        else
            socket.emit('read-env-list', [])
    })
})

if (prod)
    server.listen(port)
else
    server.listen(port, '127.0.0.1')
