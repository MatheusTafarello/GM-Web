//import api from './axiosCfg';

const signIn = (user, pass, callback) => {
    //API
    /*
    api.post('/admin/login', {
        data: {
            username: user,
            password: pass,
        }
    })
    .then((res) => {
        localStorage.loggedStatus = 'true';
        localStorage.jwtToken = res.token;
        localStorage.name = res.name;
        callback(true);
    })
    .catch((err) => {
        console.log(err);
        callback(false);
    })
    */

    //LOCAL
    localStorage.loggedStatus = 'true';
    localStorage.name = 'test user';
    callback(true);
}

const logOut = (callback) => {
    localStorage.loggedStatus = 'false';
    localStorage.jwtToken = null;
    localStorage.name = null;
    callback();
}

const isLogged = () => localStorage.loggedStatus === 'true' ? true : false;

const getUserName = () => localStorage.name;

export default {
    signIn,
    logOut,
    isLogged,
    getUserName,
};