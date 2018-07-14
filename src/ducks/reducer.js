import axios from 'axios';

const initialState = {
    user: {},
    twitterUser: {},
    twitterFriends: {}
}

const GET_USER = 'GET_USER';
const GET_TWITTER_USER = 'GET_TWITTER_USER';
const GET_TWITTER_FRIENDS = 'GET_TWITTER_FRIENDS';

export function getUser() {
    let userData = axios.get('/auth/me', console.log('rdr.getUser>SENT'))
        .then(res => {
            console.log(`rdr.getUser>RECIEVED>res.data${res.data}`);
            return res.data})
        .catch(err => {console.log('reducer.getUser', err)})
    return {
        type: GET_USER,
        payload: userData
    }
}

export function getTwitterUser(twitterHandle) {
    console.log(`rdr.getTwitterUser>${twitterHandle}`);
    let handlesData = axios.put('/twitter', {data:{twitterHandle:twitterHandle}})
        .then(res => {
            console.log('rdr.getTwitterUser>res.data', res.data.description);
            return res.data
        })
        .catch(err => { console.log('rdr.getTwitterUser>', err)});
    return {
        type: GET_TWITTER_USER,
        payload: handlesData
    }
}

export function getTwitterFriends(twitterHandle) {
    console.log(`rdr.getTwitterFriends>${twitterHandle}`);
    let handlesData = axios.put('/twitter/friends', {data:{twitterHandle:twitterHandle}})
        .then(res => {
            console.log('rdr.getTwitterFriends>res.data', res.data);
            return res.data
        })
        .catch(err => { console.log('rdr.getTwitterFriends>', err)});
    return {
        type: GET_TWITTER_FRIENDS,
        payload: handlesData
    }
}



export default function reducer(state = initialState, action) {
    switch (action.type) {

        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload})

        case GET_TWITTER_USER + '_FULFILLED':
            return Object.assign({}, state, {twitterUser: action.payload})

        case GET_TWITTER_FRIENDS + '_FULFILLED':
            return Object.assign({}, state, {twitterFriends: action.payload})

        default:
            return state;
    }
}


