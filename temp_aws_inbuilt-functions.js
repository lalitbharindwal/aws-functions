//Created By LSIT Development
function config(access_key, secret_access_key, region="us-east-1"){
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

    return new Promise((resolve, reject) => {
        s3.createBucket(params, function(err, data) {
            if (err) {
                //console.log(err, err.stack); // an error occurred
                if(err.message == "Missing credentials in config"){
                    reject("CredentialsError: Missing config(access_key, secret_access_key, region) function\nuse config(access_key, secret_access_key, region) function to configure aws account\nconfig(access_key, secret_access_key, region)\nParameters :-\naccess_key : Access Key of Aws Account\nsecret_access_key : Secret Access Key of Aws Account\nregion - (default - us-east-1) af-south-1 | ap-east-1 | ap-northeast-1 | ap-northeast-2 | ap-northeast-3 | ap-south-1 | ap-southeast-1 | ap-southeast-2 | ap-southeast-3 | ca-central-1 | cn-north-1 | cn-northwest-1 | EU | eu-central-1 | eu-north-1 | eu-south-1 | eu-west-1 | eu-west-2 | eu-west-3 | me-south-1 | sa-east-1 | us-east-2 | us-gov-east-1 | us-gov-west-1 | us-west-1 | us-west-2 | ap-south-2 | eu-south-2")
                }else if(err.message == "Network Failure"){
                    reject("CorsConfigurationError: CORS Permission Failure\nNote: This function cannot be used in a browser. S3 does not support CORS on this operation.\n")
                }else if(err.message == "Missing required key 'Bucket' in params"){
                    reject(":missing required parameter in createbucket(bucket, region) function")
                }
            }else{
                //console.log(data);           // successful response
                resolve(data);
            }
        });
    })
}

function headbucket(bucket){
    config()
    var params = {
        Bucket: bucket
       };
    var s3 = new AWS.S3();
    s3.headBucket(params, function(err, data) {
        if (err){
           //console.log(err, err.stack); // an error occurred
            if(err.message == "Missing credentials in config"){
            console.log("CredentialsError: Missing credentials in config\nuse config(access_key, secret_access_key, region) function to configure aws account\nconfig(access_key, secret_access_key, region)\nParameters :-\naccess_key : Access Key of Aws Account\nsecret_access_key : Secret Access Key of Aws Account\nregion - (default - us-east-1) af-south-1 | ap-east-1 | ap-northeast-1 | ap-northeast-2 | ap-northeast-3 | ap-south-1 | ap-southeast-1 | ap-southeast-2 | ap-southeast-3 | ca-central-1 | cn-north-1 | cn-northwest-1 | EU | eu-central-1 | eu-north-1 | eu-south-1 | eu-west-1 | eu-west-2 | eu-west-3 | me-south-1 | sa-east-1 | us-east-2 | us-gov-east-1 | us-gov-west-1 | us-west-1 | us-west-2 | ap-south-2 | eu-south-2")
            }else if(err.message == "Network Failure"){
                console.log("CorsConfigurationError: CORS Permission Failure\nEither bucket Doesn't Exist or Configure Cross-origin resource sharing (CORS) permission of bucket\n1. Open the Amazon S3 console at https://console.aws.amazon.com/s3/.\n2. Select the name of the bucket that you have to delete from the bucket list.\n3. Next, Choose 'Permission' tab.\n4. Then in an editor titled 'Cross-origin resource sharing (CORS)', you need to make sure the S3 bucket has CORS configuration:")
            }
            //console.log(err)
        }else{
            console.log(data);           // successful response
        }     
   });
}

function deletebucket(bucket){
    config()
    var s3 = new AWS.S3();
    var params = {
        Bucket: bucket
       };
    return new Promise((resolve, reject) => {
        s3.deleteBucket(params, function(err, data) {
            if (err){
                //console.log(err, err.stack); // an error occurred
                if(err.message == "Missing credentials in config"){
                    reject("CredentialsError: Missing config(access_key, secret_access_key, region) function\nuse config(access_key, secret_access_key, region) function to configure aws account\nconfig(access_key, secret_access_key, region)\nParameters :-\naccess_key : Access Key of Aws Account\nsecret_access_key : Secret Access Key of Aws Account\nregion - (default - us-east-1) af-south-1 | ap-east-1 | ap-northeast-1 | ap-northeast-2 | ap-northeast-3 | ap-south-1 | ap-southeast-1 | ap-southeast-2 | ap-southeast-3 | ca-central-1 | cn-north-1 | cn-northwest-1 | EU | eu-central-1 | eu-north-1 | eu-south-1 | eu-west-1 | eu-west-2 | eu-west-3 | me-south-1 | sa-east-1 | us-east-2 | us-gov-east-1 | us-gov-west-1 | us-west-1 | us-west-2 | ap-south-2 | eu-south-2")
                }else if(err.message == "Network Failure"){
                    reject("CorsConfigurationError: CORS Permission Failure\nEither bucket Doesn't Exist or Configure Cross-origin resource sharing (CORS) permission of bucket\n1. Open the Amazon S3 console at https://console.aws.amazon.com/s3/.\n2. Select the name of the bucket that you have to delete from the bucket list.\n3. Next, Choose 'Permission' tab.\n4. Then in an editor titled 'Cross-origin resource sharing (CORS)', you need to make sure the S3 bucket has CORS configuration:")
                }else if(err.message == "Missing required key 'Key' in params"){
                    reject(": missing required parameter in insertobject(body, bucket,  key) function")
                }else if(err.message == "The bucket you tried to delete is not empty"){
                    reject(err.message)
                }
                reject(err)
            }else{
                //console.log(data);           // successful response
                var detail_json_data = {
                    "error": false,
                    "bucket": bucket,
                    "data": data
                }
                resolve(detail_json_data);
            }
        });
    })
}

function insertobject(body, bucket,  key){
    config()
    var s3 = new AWS.S3();
    var params = {
        Body: JSON.stringify(body),
        Bucket: bucket,
        Key: key
    };

    return new Promise((resolve, reject) => {
        s3.putObject(params, function(err, data) {
            if(err){
               //console.log(err, err.stack); // an error occurred
                if(err.message == "Missing credentials in config"){
                    reject("CredentialsError: Missing config(access_key, secret_access_key, region) function\nuse config(access_key, secret_access_key, region) function to configure aws account\nconfig(access_key, secret_access_key, region)\nParameters :-\naccess_key : Access Key of Aws Account\nsecret_access_key : Secret Access Key of Aws Account\nregion - (default - us-east-1) af-south-1 | ap-east-1 | ap-northeast-1 | ap-northeast-2 | ap-northeast-3 | ap-south-1 | ap-southeast-1 | ap-southeast-2 | ap-southeast-3 | ca-central-1 | cn-north-1 | cn-northwest-1 | EU | eu-central-1 | eu-north-1 | eu-south-1 | eu-west-1 | eu-west-2 | eu-west-3 | me-south-1 | sa-east-1 | us-east-2 | us-gov-east-1 | us-gov-west-1 | us-west-1 | us-west-2 | ap-south-2 | eu-south-2")
                }else if(err.message == "Network Failure"){
                    reject("CorsConfigurationError: CORS Permission Failure\nEither bucket Doesn't Exist or Configure Cross-origin resource sharing (CORS) permission of bucket\n1. Open the Amazon S3 console at https://console.aws.amazon.com/s3/.\n2. Select the name of the bucket that you have to delete from the bucket list.\n3. Next, Choose 'Permission' tab.\n4. Then in an editor titled 'Cross-origin resource sharing (CORS)', you need to make sure the S3 bucket has CORS configuration:")
                }else if(err.message == "Missing required key 'Key' in params"){
                    reject(": missing required parameter in insertobject(body, bucket,  key) function")
                }
            }else{
               //console.log(data);           // successful response
               data['body'] = body
               data['key'] = key
               data['bucket'] = bucket
               resolve(data);       
            }
       });
    })
}

function getobject(bucket, key) {
    var s3 = new AWS.S3();
    var params = {
    Bucket: bucket, 
    Key: key,
    };
    return new Promise((resolve, reject) => {
        s3.getObject(params, function(err, data) {
            if (err){
                if(err.message == "Missing credentials in config"){
                    reject("CredentialsError: Missing config(access_key, secret_access_key, region) function\nuse config(access_key, secret_access_key, region) function to configure aws account\nconfig(access_key, secret_access_key, region)\nParameters :-\naccess_key : Access Key of Aws Account\nsecret_access_key : Secret Access Key of Aws Account\nregion - (default - us-east-1) af-south-1 | ap-east-1 | ap-northeast-1 | ap-northeast-2 | ap-northeast-3 | ap-south-1 | ap-southeast-1 | ap-southeast-2 | ap-southeast-3 | ca-central-1 | cn-north-1 | cn-northwest-1 | EU | eu-central-1 | eu-north-1 | eu-south-1 | eu-west-1 | eu-west-2 | eu-west-3 | me-south-1 | sa-east-1 | us-east-2 | us-gov-east-1 | us-gov-west-1 | us-west-1 | us-west-2 | ap-south-2 | eu-south-2")
                }else if(err.message == "Network Failure"){
                    reject("CorsConfigurationError: CORS Permission Failure\nEither bucket Doesn't Exist or Configure Cross-origin resource sharing (CORS) permission of bucket\n1. Open the Amazon S3 console at https://console.aws.amazon.com/s3/.\n2. Select the name of the bucket that you have to delete from the bucket list.\n3. Next, Choose 'Permission' tab.\n4. Then in an editor titled 'Cross-origin resource sharing (CORS)', you need to make sure the S3 bucket has CORS configuration:")
                }else if(err.message == "Missing required key 'Key' in params"){
                    reject(": missing required parameter in getobject(bucket, key) function")
                }else if(err.message == "The specified key does not exist."){
                    reject(err.message)
                }
                
            }else{
                var detail_json_data = {
                    "data":  data,
                    "value": data.Body.toString('utf-8')
                }
                resolve(detail_json_data);
            }
        });
    })
}

function deleteobject(bucket, key){
    config()
    var s3 = new AWS.S3();
    var params = {
        Bucket: bucket,
        Key: key
       };
       
    return new Promise((resolve, reject) => {
        s3.deleteObject(params, function(err, data) {
            if (err){
                //console.log(err, err.stack); // an error occurred
                if(err.message == "Missing credentials in config"){
                    reject("CredentialsError: Missing credentials in config\nuse config(access_key, secret_access_key, region) function to configure aws account\nconfig(access_key, secret_access_key, region)\nParameters :-\naccess_key : Access Key of Aws Account\nsecret_access_key : Secret Access Key of Aws Account\nregion - (default - us-east-1) af-south-1 | ap-east-1 | ap-northeast-1 | ap-northeast-2 | ap-northeast-3 | ap-south-1 | ap-southeast-1 | ap-southeast-2 | ap-southeast-3 | ca-central-1 | cn-north-1 | cn-northwest-1 | EU | eu-central-1 | eu-north-1 | eu-south-1 | eu-west-1 | eu-west-2 | eu-west-3 | me-south-1 | sa-east-1 | us-east-2 | us-gov-east-1 | us-gov-west-1 | us-west-1 | us-west-2 | ap-south-2 | eu-south-2")
                }else if(err.message == "Network Failure"){
                    reject("CorsConfigurationError: CORS Permission Failure\nEither bucket Doesn't Exist or Configure Cross-origin resource sharing (CORS) permission of bucket\n1. Open the Amazon S3 console at https://console.aws.amazon.com/s3/.\n2. Select the name of the bucket that you have to delete from the bucket list.\n3. Next, Choose 'Permission' tab.\n4. Then in an editor titled 'Cross-origin resource sharing (CORS)', you need to make sure the S3 bucket has CORS configuration:")
                }else if(err.message == "Missing required key 'Key' in params"){
                    reject(": missing required parameter in deleteobject(bucket, key) function")
                }
            }else{
                //console.log(data);           // successful response
                var detail_json_data =  {
                    "data": data,
                    "error": false
                }
                resolve(detail_json_data);
            }     
        });
    })
}

//console.log("Developed By LSIT Development")