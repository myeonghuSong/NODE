const express = require('express');
const router = express.Router();
const rp = require('request-promise');
const cheerio = require('cheerio');
const path = require('path');
const qs = require('querystring');

router.get('/', (req, res) => {
    let name = req.query.search;
    console.log('name',name);
    // let uri = `https://www.daangn.com/search/${qs.escape(req.query.search)}`; 
    const options = {
        uri: `http://browse.gmarket.co.kr/search/`,
        qs: {
            keyword: name,
            k: 32,
            p: 1,
        },
        headers: {
            'User-Agent': 'Request-Promise',
            'Content-Type': 'charset=utf-8',
            'URIEndocing': "EUC-KR",
            'Accept-Language': 'ko, en-US',
        },
        json: false // Automatically parses the JSON string in the response
    };
    
    rp(options, (error, response, body) => {
        const arr = [];
        const $ = cheerio.load(body);
        const lists = $('div#section__inner-content-body-container > div.section__module-wrap:nth-child(4)');

        // lists.map((i, el) => {
        //     let data = $(el);
        //     console.log(data.text());
        // })
        
        lists.contents().map((i, el)=> {
            let data = $(el);
            console.log(data.children('.box__item-container').children('.box__information').children('.box__information-major').children('.box__item-title').find('.text__item').text()); //상품 제목

            console.log('**');
        });
        // console.log(arr);




        // let kind = $('#flea-market-wrap').children('.article-kind').text();
        // let cards = $('#flea-market-wrap').contents().find('.article-region-name').text();
        // arr = cards.split('      ');
        // console.log(cards);

        // console.log(arr);
        // arr = cards.map((key, value) => {
        //     arr.push(value.text());
        // })
        // for(let i=0; i<arr.length; i++){
        //     arr[i] = arr[i].trim();
        //     arr[i].replace('\n', '');            
        // }
        // arr = arr.filter(d => d.length > 0);
        // console.log(arr);
        // res.send(collection);
        // for(let i=0; i<10; i++){
        // console.log(`${i+1}순위 `, collection[i].data);
        // arr.push(collection[i].data);
        // }
        
        let result;
        // related(arr).then(data => {
        //     result = data;
        //     console.log('result', result);
        // res.send(result); 
        // })
        // .catch(error => {
        //     console.error(error);
        // });
        // res.send(lists);
    });
    
})

module.exports = router;