const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const api = require('./api');

const router = express.Router();

router.use('/api', api);

module.exports = router;
