const related = require('./related');
const rp = require('request-promise');
const cheerio = require('cheerio');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    rp('http://www.naver.com', async (error, response, body) => {
        const arr = [];
        const $ = cheerio.load(body);
        let collection = $('.ah_k').contents();
        
        for(let i=0; i<10; i++){
        console.log(`${i+1}순위 `, collection[i].data);
        arr.push(collection[i].data);
        }
        
        let result;
        result = await related(arr);
        // .then(data => {
        //     result = data;
            console.log('result', result);

        res.send(result); 
        // })
        // .catch(error => {
        //     console.error(error);
        // });
        
        
    });
})

module.exports = router;
