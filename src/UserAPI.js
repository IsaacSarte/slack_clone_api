// axios
import axios from 'axios';

const API_URL = 'https://slackapi.avionschool.com/api/v1/';

// sign up / register function
export const signUp = (body) => {
    const url = API_URL + 'auth/';
    return axios.post(url, body);
}

// sign in / login function
export const signIn = (body) => {
    const url = API_URL + 'auth/sign_in';
    return axios.post(url, body);
}

// send messages function
export const sendMessages = (header, body) => {
    const url = API_URL + 'messages';
    return axios.post(url, body, {headers: header});
}

// get messeages function
export const getMessages = (header, id, type) => {
    const url = API_URL + `messages?receiver_class=${type}&receiver_id=${id}`;
    return axios.get(url, {headers: header});
}

// create channel function
export const createChannel = (header, body) => {
    const url = API_URL + `channels`;
    return axios.post(url, body, {headers: header});
}

// get all users function
export const getAllUsersChannel = (header) => {
    const url = API_URL + `channels`;
    return axios.get(url, {headers: header});
}

// get owned channels function
export const getOwnedChannels = (header) => {
    const url = API_URL + `channels/owned`;
    return axios.get(url, {headers: header});
}

// get channel details function
export const getChannelDetails = (header, ID) => {
    const url = API_URL + `channels/${ID}`;
    return axios.get(url, {headers: header});
}

// add member to channel function
export const addMember = (header, channelID, userID) => {
    const url = API_URL + 'channel/add_member';
    return axios.post(
      url,
      { id: channelID, member_id: userID },
      { headers: header }
    );
}

// list of users function
export const listUsers = (header) => {
    const url = API_URL + 'users';
    return axios.get(url, { headers: header });
}

// get recent function
export const getRecent = (header) => {
    const url = API_URL + 'users/recent';
    return axios.get(url, { headers: header });
}