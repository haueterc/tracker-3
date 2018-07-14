require('dotenv').config();
const express = require('express')
    , axios = require('axios')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , ama = require('./controllers/Auth0/Auth0_Management_API_controller')
    , tc = require('./controllers/Twitter/Twitter_controller')

const app = express();
const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING
} = process.env;

// Linking Auth0 Management API V2 Accounts
const {
    PRIMARY_ACCOUNT_JWT,
    SECONDARY_ACCOUNT_JWT,
    UPDATE_IDENTITIES
} = process.env;

massive(CONNECTION_STRING).then( db => {
    app.set('db', db);
})
//-- serve up static files from npm run build
// app.use(express.static(__dirname + './../build'))
//---
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Auth0Strategy({
// passport identification
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function(accessToken, refreshToken, extraParams, profile, done) {
// db calls
    const db = app.get('db');
    let { user_id, displayName, picture } = profile;
    let auth_id = user_id;
    ama.getAuth0FullUserProfile(auth_id, (respData)=>{
        let { provider, user_id, access_token, access_token_secret} = respData.identities[0];
        // massive wants arguments passed in as an array
        db.find_user([auth_id]).then( users => {
            // check to see if the array has an item because an empty array could be returned
            if (users[0]) {
                return done(null, users[0].id)
            } else {
                db.create_user([displayName, picture, auth_id, provider, user_id, access_token, access_token_secret])
                .then( createdUser => {
                    return done(null, createdUser[0].id)
                }).catch(err=>{console.log(`ama.getAuth0FullUserProfile>db.create_user`, err)})
            }
        }).catch(console.log)
    })

})) 

passport.serializeUser((id, done) => {
    // puts info in the session store
    return done(null, id)
})

passport.deserializeUser((id, done) => {
    // retrieves info from the session store
    // supposed to put info on req.user
    // fires before anything else like componentdidmount
    app.get('db').find_session_user([id]).then( user => {
        done(null, user[0]);
    }).catch(console.log)
})

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    // to a specific page successRedirect: 'http://localhost:3000/#/somepage'
    // change the port after npm run build to point to the backend server
    successRedirect: 'http://localhost:3000/#/private',
    failureRedirect: 'http://localhost:3000/#/'
}))

app.get('/auth/me', function(req, res) {
    if (req.user) {
        let { display_name, picture, provider_id, provider_platform } = req.user;
        console.log(`/auth/me>req.user>`, display_name);
        res.status(200).send({
            display_name: display_name,
            picture: picture,
            provider_id: provider_id,
            provider_platform: provider_platform
        });
    } else {
        res.status(401).send('Nice try sucka')
    }
})
app.put('/twitter', tc.getUser)
app.put('/twitter/friends', tc.getFriends)

app.get('/logout', function(req, res) {
    console.log('hit /logout')
    req.logOut();
    res.redirect('http://localhost:3000')
})

app.listen(SERVER_PORT, () => {
    console.log(`Listening on Port: ${SERVER_PORT}`)
});
