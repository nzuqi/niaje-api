const path = require('path');

// check if object is empty
const isObjEmpty = (obj) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
}

const isInArray = (needle, haystack) => {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
        if (haystack[i] == needle)
            return true;
    }
    return false;
}

const middleware = {
    checkHeaders: (req, res, next) => {
        // const corsWhitelist = [
        //     'https://martin.co.ke',
        //     'http://localhost:3000',
        // ];
        // if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        // };
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
        next();
    },
    checkToken: (req, res, next) => {
        const whitelistedUrls = [
            `/${defaults.uploadsMask}/${path.basename(req.originalUrl)}`,
            "/api/v1/openai/search",
        ];
        if (whitelistedUrls.includes(req.originalUrl)) {
            next();
            return;
        }

        let token = req.headers['x-access-token'] || req.headers['authorization'] || req.body['access_token'];
        const errResponse = {
            status: 3,
            message: "Sorry, you're not authorized to make this request.",
        };
        try {
            if (token.startsWith('Bearer ')) {
                // Remove Bearer from string
                token = token.slice(7, token.length);
            }
        } catch (error) {
            return res.status(403).send(errResponse);
        }
        if (token) {
            // const db = require("../models");
            // const User = db.users;
            // User.findOne({ access_token: token }, (user) => { return user; }).then((usr) => {
            //     if (usr) next();
            //     else return res.status(403).send(errResponse);
            // }).catch(err => {
            //     return res.status(403).send(errResponse);
            // });
            next();
        } else {
            return res.status(403).send(errResponse);
        }
    },
};

const bcrypt = require('bcrypt');
const encrypt = {
    cryptPassword: (password) =>
        bcrypt.genSalt(10)
            .then((salt => bcrypt.hash(password, salt)))
            .then(hash => hash),

    comparePassword: (password, hashPassword) =>
        bcrypt.compare(password, hashPassword)
            .then(resp => resp)

}

const defaults = {
    session_expiry: (3600 * 24), // expires in 24 hours
    jwt_key: "~?Er%Y;WE-:,b=RL*{%8P)7v;@}T&8dfz%7i5XL2:{KJ-`s[j`m:U<<_7BXdod5D>UKeOo===7gLlrqxi49IG9MFju5bk",
}

const generateRandomString = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

const modifyString = {
    capitalizeFirstLetter: (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
}

const filterAndCount = (data = [], filterField = '_id', filterValue = '') => {
    let filteredData = [];
    filteredData = data.filter((d) => { return d[filterField] === filterValue });
    return filteredData.length;
};

const objectID = require('mongoose').Types.ObjectId;

module.exports = {
    isObjEmpty,
    isInArray,
    middleware,
    encrypt,
    defaults,
    generateRandomString,
    modifyString,
    objectID,
    path,
    filterAndCount
}