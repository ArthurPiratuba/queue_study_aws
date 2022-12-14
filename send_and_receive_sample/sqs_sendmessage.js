require('dotenv').config();
const { v4: uuid } = require('uuid');
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: 'us-east' });
// Create an SQS service object
var sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

var params = {
    // Remove DelaySeconds parameter and value for FIFO queues
    MessageAttributes: {
        "Atributo1": {
            DataType: "String",
            StringValue: "Valor de teste do atributo"
        },
        "Atributo2": {
            DataType: "Number",
            StringValue: "6"
        }
    },
    MessageBody: "Corpo de testes",
    MessageDeduplicationId: uuid(),  // Required for FIFO queues
    MessageGroupId: "1",  // Required for FIFO queues
    QueueUrl: process.env.SQS_URL
};

sqs.sendMessage(params, function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.MessageId);
    }
});