const test = require('hackerpunk-api');

const testfunc = async function(){
    const text = await test.createWallet('hello');
    console.log(text);
};

testfunc();