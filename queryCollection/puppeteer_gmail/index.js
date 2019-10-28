var puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

(async () => {

    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();

    let id;
    let pw;

    await fs.readFile('./account.json','utf-8', (err, data) => {
        if(err) throw err;
        const jsondata = JSON.parse(data);
        id = jsondata.id;
        pw = jsondata.pw;
    });
    
    //페이지로 가라
    await page.goto('https://nid.naver.com/nidlogin.login?url=http%3A%2F%2Fmail.naver.com%2F');

    //아이디랑 비밀번호 란에 값을 넣어라
    await page.evaluate((id,pw) => {
    document.querySelector('input[name="id"]').value = id;
    document.querySelector('input[name="pw"]').value = pw;
    }, id, pw);

    //로그인 버튼을 클릭해라
    await page.click('input.btn_global');

    // document.querySelector('input[name="password"]').value = pw;
    //로그인 화면이 전환될 때까지 .5초만 기다려라
    await page.waitFor(500);

    console.log(page.url());

    //로그인 실패시(화면 전환 실패시)
    if(page.url() === 'https://www.naver.com'){
        student_id = 'nope';
        name = 'nope';
    }
    //로그인 성공시
    else{
        console.log('bb',page.url());
      
        await page.goto('https://mail.naver.com/');
    
        const body = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(body);
        const datas = $('.mailList.sender_context').find('li');

        const arr = [];
        datas.map((i, el) => {
            const data = cheerio.load(el);
            let title = data('.mTitle').children('.name').find('a').text();
            let contents = data('.subject').find('.mail_title').text();
            let content = contents.replace('메일 제목:', '');
            content = content.trim();
            // console.log('$$$$$$$$$$', subject);
            if(title.length !== 0){
                arr.push({
                    title,
                    content
                });
            }
            
        })

        console.log(arr);

    }
 
    
    await browser.close();        
})();