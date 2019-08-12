var express = require('express');
var userTwitter = require('./userTwitter');

const router = express.Router();

/**
 * @param {*} req
 * @param {*} res
 */

router.post('/login', userTwitter.loginTwitter);
router.post('/hashtag', userTwitter.getTweetsByHashtag);


module.exports =  router;