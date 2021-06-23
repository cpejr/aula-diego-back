const AWS = require('aws-sdk');
const path = require('path');

const accessKeyId = process.env.WASABI_KEY_ID;
const secretAccessKey = process.env.WASABI_SECRET;
const bucketName = process.env.WASABI_BUCKET_NAME;

const wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com');

const s3 = new AWS.S3({
  endpoint: wasabiEndpoint,
  accessKeyId,
  secretAccessKey
})

async function upload(filePath, fileStream){
  const params = {
    Bucket: bucketName,
    Key: path.basename(filePath),
    Body: fileStream
  };
  try {
    const data = await s3.upload(params).promise();
    return data
  } catch (error) {
   console.error(error);
   throw Error(error);
  }
}

async function download(key){
  const params = {
    Bucket: bucketName,
    Key: key,
  };
  try {
    const data = await s3.getObject(params).promise();
    return data;
  } catch (error) {
   console.error(error);
   throw Error(error);
  }
}

async function remove(key){
  const params = {
    Bucket: bucketName,
    Key: key,
  };
  try {
    const data = await s3.deleteObject(params).promise();
    return data;
  } catch (error) {
   console.error(error);
   throw Error(error);
  }
}

async function listFiles(){
  const params = {
    Bucket: bucketName,
  };
  try {
    let files = [];
    const data = await s3.listObjectsV2(params).promise();
    data.Contents.forEach((element)=>{
      files.push({filename: element.Key, key: element.key, lastModified: element.LastModified, size: element.Size})
    })
    return files;
  } catch (error) {
   console.error(error);
   throw Error(error);
  }
}

const wasabi = {upload, download, remove, listFiles};

module.exports = wasabi;