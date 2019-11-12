
const nodemailer = require('nodemailer');
const mailConfig = require('../settings/mail');

module.exports = nodemailer.createTransport(mailConfig);
