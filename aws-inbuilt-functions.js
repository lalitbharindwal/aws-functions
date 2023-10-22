//Created By LSIT Development

function config(access_key, secret_access_key, region){
    AWS.config.update({
        region: region,
        //endpoint: "http://localhost:8000",
        accessKeyId: access_key,
        secretAccessKey: secret_access_key
        });
}

function createbucket(bucket, region="us-east-1"){
    config()
    var s3 = new AWS.S3();
    var params = {
        Bucket: bucket,
        CreateBucketConfiguration: {
            LocationConstraint: region
           }
       };
       s3.createBucket(params, function(err, data) {
         if (err) {
            console.log(err, err.stack); // an error occurred
         }else{
            console.log(data);           // successful response
         }
       });
}

function deletebucket(bucket){
    var params = {
        Bucket: bucket
       };
       s3.deleteBucket(params, function(err, data) {
         if (err){
            //console.log(err, err.stack); // an error occurred
         }else{
            //console.log(data);           // successful response
         }     
       });
}

function insertobject(body, bucket,  key){
    config()
    var s3 = new AWS.S3();
    var params = {
        Body: JSON.stringify(body),
        Bucket: bucket,
        Key: key
    };

    s3.putObject(params, function(err, data) {
         if(err){
            //console.log(err, err.stack); // an error occurred
            
         }else{
            //console.log(data);           // successful response          
         }   
    });
}

function deleteobject(bucket, key){
    config()
    var s3 = new AWS.S3();
    var params = {
        Bucket: bucket,
        Key: key
       };
       s3.deleteObject(params, function(err, data) {
         if (err){
                //console.log(err, err.stack); // an error occurred
         }else{
                //console.log(data);           // successful response
         }     
    });
}

console.log("Developed By LSIT Development")