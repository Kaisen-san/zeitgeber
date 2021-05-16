
const nodemailer = require('nodemailer');
const mailConfig = require('../configs/mail');

module.exports = nodemailer.createTransport(mailConfig);
