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
  sendGrid: async (data, MAIL_NAME) => {
    const template = MAIL_TEMPLATES[MAIL_NAME];
    sgMail.setApiKey(process.env.SEND_GRID_KEY);
    const msg = {
      to: data.email, // Change to your recipient
      from: process.env.ACCOUNT_SENDER, // Change to your verified sender
      subject: template.subject,
      html: await ejs.renderFile(
        path.resolve(__dirname, template.ejsContent),
        data
      ),
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      return error;
    }
  },
};
