function aws_config(access_key, secret_access_key, region){
    AWS.config.update({
        //region: "us-east-1",
        region: region,
        //endpoint: "http://localhost:8000",
        //accessKeyId: "AKIAVVALCTCZPOR5QOH2",
        accessKeyId: access_key,
        //secretAccessKey: "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"
        secretAccessKey: secret_access_key
        });
}

function put_object(body, bucket,  key){
    aws_config()
    var s3 = new AWS.S3();
    var params = {
        Body: JSON.stringify(body),
        Bucket: bucket,
        Key: key
    };

    s3.putObject(params, function(err, data) {
         if(err){
            console.log(err, err.stack); // an error occurred
            
         }else{
            console.log(data);           // successful response          
         }   
    });
}

function delete_object(bucket, key){
    aws_config()
    var s3 = new AWS.S3();
    var params = {
        Bucket: bucket,
        Key: key
       };
       s3.deleteObject(params, function(err, data) {
         if (err){
                console.log(err, err.stack); // an error occurred
         }else{
                console.log(data);           // successful response
         }     
       });
}

