require('dotenv').config();
const { Consumer } = require('sqs-consumer');
let nodemailer = require('nodemailer');

const app = Consumer.create({
    queueUrl: process.env.SQS_URL,
    handleMessage: async (message) => {
        console.log(message)
        let email = JSON.parse(message.Body);
        console.log(email);
        sendEmail(email);
    }
});

app.on('error', (err) => {
    console.error(err.message);
});

app.on('processing_error', (err) => {
    console.error(err.message);
});

app.start();

function sendEmail(email) {
    console.log(process.env.EMAIL_ADDRESS);
    console.log(process.env.EMAIL_PASSWORD);
    let transport;
    transport = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        secureConnection: false,
        port: 587,
        tls: { ciphers: 'SSLv3' },
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    transport.sendMail(email);
}

