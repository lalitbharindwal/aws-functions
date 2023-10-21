   /*
   var script = document.createElement('script');
    script.src = 'https://sdk.amazonaws.com/js/aws-sdk-2.1.12.min.js';
    document.body.appendChild(script);

    var script = document.createElement('script');
script.src = 'https://lucent-semifreddo-14f0a4.netlify.app/if.js';
document.body.appendChild(script);
*/

async function script1(){
    const script = document.createElement('script');
    // use local file
    // script.src = 'script.js';
    script.src =
      'https://sdk.amazonaws.com/js/aws-sdk-2.1.12.min.js';
    script.async = true;
    // make code in script to be treated as JavaScript module
    // script.type = 'module';
    /*
    script.onload = () => {
      console.log('Script1 loaded successfuly');
    };
    */
    script.onerror = () => {
      console.log('Error occurred while loading script');
    };
    document.body.appendChild(script);
}

async function script2(){
    const script = document.createElement('script');
// use local file
// script.src = 'script.js';
script.src =
  'https://lucent-semifreddo-14f0a4.netlify.app/aws-inbuilt-functions.js';
script.async = true;
// make code in script to be treated as JavaScript module
// script.type = 'module';
/*
script.onload = () => {
  console.log('Script2 loaded successfuly');
};
*/

script.onerror = () => {
  console.log('Error occurred while loading script');
};

document.body.appendChild(script);
}

script1()
script2()