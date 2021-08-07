const sgMail = require("@sendgrid/mail");
const ejs = require("ejs");
const path = require("path");

const MAIL_TEMPLATES = {
  WELCOME: {
    subject: "Welcome to Inkiii.",
    ejsContent: "../templates/welcome.ejs",
  },
};

module.exports = {
  sendGrid: async (data, MAIL_NAME) => {},
};
