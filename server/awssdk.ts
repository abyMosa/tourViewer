import AWS from 'aws-sdk';

// export const AWSS3 = new AWS.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });


export const AWSS3 = new AWS.S3({
    region: 'us-east-1', // Put your aws region here
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});