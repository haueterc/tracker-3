const { 
    SERVER_PORT,
    YOUR_ACCOUNT,
    YOUR_NON_INTERACTIVE_CLIENT_ID, 
    YOUR_NON_INTERACTIVE_CLIENT_SECRET,
    YOUR_ACCESS_TOKEN,
    MANAGEMENT_API_SCOPES,
    USER_ID
} = process.env;

// Linking Auth0 Management API V2 Accounts
const {
    PRIMARY_ACCOUNT_JWT,
    SECONDARY_ACCOUNT_JWT,
    UPDATE_IDENTITIES
} = process.env;

var AuthenticationClient = require('auth0').AuthenticationClient;

var auth0 = new AuthenticationClient({
  domain: `${YOUR_ACCOUNT}.auth0.com`,
  clientId: `${YOUR_NON_INTERACTIVE_CLIENT_ID}`,
  clientSecret: `${YOUR_NON_INTERACTIVE_CLIENT_SECRET}`
});

module.exports={
    getAuth0FullUserProfile: function(user_id, cb) {
        auth0.clientCredentialsGrant({
            audience: `https://${YOUR_ACCOUNT}.auth0.com/api/v2/`,
            scope: `${MANAGEMENT_API_SCOPES}`
          },
          function(err, response) {
            var request = require("request");
        
            var options = { 
                method: 'GET',
                url: `https://${YOUR_ACCOUNT}.auth0.com/api/v2/users/${user_id}`,
                headers: 
                    { authorization: `Bearer ${response.access_token}`}
                };
        
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                let obj = JSON.parse(body);
                cb(obj)
            }); } );
    }
}