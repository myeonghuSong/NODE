const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports = (qs) => { return new Promise(resolve => {
    const options = {
        uri: 'https://search.naver.com/search.naver',
        qs: {
            where: 'nexearch',
            query: qs,
            sm: 'top_lve',
            ie: 'utf8'

        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };
    // https://search.naver.com/search.naver?where=nexearch&query=%EC%86%A1%EC%84%B1%EB%AC%B8&sm=top_lve&ie=utf8
    let collection;    
    rp(options, (error, response, body) => {
        const $ = cheerio.load(body);
        collection = $('._related_keyword_ul').contents().text();
        collection = collection.split('   ');
        collection[0] = collection[0].trim();
        collection[collection.length-1] = collection[collection.length-1].trim();
        // console.log(collection);
        resolve(collection);
    });
}) 
};