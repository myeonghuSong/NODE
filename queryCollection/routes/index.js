const express = require('express');
const router = express.Router();
const rp = require('request-promise');
const cheerio = require('cheerio');
const related = require('../query/related');


rp('http://www.naver.com', (error, response, body) => {
    const arr = [];
    const $ = cheerio.load(body);
    let collection = $('.ah_k').contents();
    
    for(let i=0; i<10; i++){
    console.log(`${i+1}순위 `, collection[i].data);
    arr.push(collection[i].data);
    }
    
    let result;
    related(arr).then(data => {
        result = data;
        console.log('result', result);
    });
    
});

module.exports = router;