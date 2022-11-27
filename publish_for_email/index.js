require('dotenv').config();
const { v4: uuid } = require('uuid');
var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east' });
var sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

var params = {
    MessageBody: '{"from":"' + process.env.EMAIL_FROM + '","to":["' + process.env.EMAIL_TO + '"],"bcc":"","subject":"Assunto de teste","html":"<em>' + uuid() + '</em>"}',
    MessageDeduplicationId: uuid(),
    MessageGroupId: "1",
    QueueUrl: process.env.SQS_URL
};

sqs.sendMessage(params, function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.MessageId);
    }
});