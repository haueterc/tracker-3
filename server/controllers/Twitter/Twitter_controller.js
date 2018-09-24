var Twit = require('twit')

let { TWITTER_CONSUMER_API_KEY, TWITTER_CONSUMER_API_SECRET } = process.env;

  module.exports={
    getUser: function(req, res) {
        let { access_token, access_token_secret } = req.user;
        // const { params } = req.body.data;
        let { twitterHandle } = req.body.data;
        console.log(`/twitter/tc.getUser>RECEIVED>req.body.data>${twitterHandle}`);
        let T = new Twit({
            consumer_key:         TWITTER_CONSUMER_API_KEY,
            consumer_secret:      TWITTER_CONSUMER_API_SECRET,
            access_token:         access_token,
            access_token_secret:  access_token_secret,
            timeout_ms:           60*1000  // optional HTTP request timeout to apply to all requests.
        })
        let path = 'users/show';
        let params = { screen_name: `${twitterHandle}` };
        T.get(path, params, function(err, stuff, response) {
            res.status(200).send(stuff);
            console.log(`/twitter/tc.getUser>data.followers_count>`, stuff.followers_count);
        })
      .catch( () => res.status(500).send(err));
      },
      getFriends: function(req, res) {
        let { access_token, access_token_secret } = req.user;
        // const { params } = req.body.data;
        let { twitterHandle } = req.body.data;
        console.log(`/twitter/tc.getUser>RECEIVED>req.body.data>${twitterHandle}`);
        let T = new Twit({
            consumer_key:         TWITTER_CONSUMER_API_KEY,
            consumer_secret:      TWITTER_CONSUMER_API_SECRET,
            access_token:         access_token,
            access_token_secret:  access_token_secret,
            timeout_ms:           60*1000  // optional HTTP request timeout to apply to all requests.
        })
        let path = 'friends/list';
        let params = {screen_name:`${twitterHandle}`,count:200,skip_status:true,include_user_entities:false};
        T.get(path, params, function(err, stuff, response) {
          console.log(`tc.getFriends>next_cursor|`,stuff.next_cursor);
          res.status(200).send(stuff);
        })
      .catch( () => res.status(500).send(err));
      },
      getFriendsIds: function(req, res) {
        let { access_token, access_token_secret } = req.user;
        // const { params } = req.body.data;
        let { twitterHandle } = req.body.data;
        console.log(`/twitter/tc.getUser>RECEIVED>req.body.data>${twitterHandle}`);
        let T = new Twit({
            consumer_key:         TWITTER_CONSUMER_API_KEY,
            consumer_secret:      TWITTER_CONSUMER_API_SECRET,
            access_token:         access_token,
            access_token_secret:  access_token_secret,
            timeout_ms:           60*1000  // optional HTTP request timeout to apply to all requests.
        })
        let path = 'friends/ids';
        let params = {screen_name:`${twitterHandle}`,count:5000};
        T.get(path, params, function(err, stuff, response) {
          console.log(`tc.getFriendsIds>next_cursor|`,stuff.next_cursor);

          // Go to the db check each id against the db to see if there are any new ones, if so return also see if 




          res.status(200).send(stuff);
        })
      .catch( () => res.status(500).send(err));
      },
    getTweets: function(req, res) {
        let { access_token, access_token_secret } = req.user;
        // const { params } = req.body.data;
        let { user } = req.query;
        console.log('tc.search>', req.query);
        let T = new Twit({
            consumer_key:         TWITTER_CONSUMER_API_KEY,
            consumer_secret:      TWITTER_CONSUMER_API_SECRET,
            access_token:         access_token,
            access_token_secret:  access_token_secret,
            timeout_ms:           60*1000  // optional HTTP request timeout to apply to all requests.
        })
        let path = 'search/tweets';
        let params = { q: 'banana since:2011-07-11', count: 2 };
        T.get(path, params, function(err, data, response) {
          console.log('tc.getTweets>', data)
        })
      }
    }