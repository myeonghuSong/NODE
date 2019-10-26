function carrot_btn (){
    let name = document.getElementById('carrot_search').value;
    console.log('aaa',name);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:3000/carrotMarket?search=${name}`);
    xhr.setRequestHeader('Content-Type', "application/json");
    xhr.send(null);

    xhr.addEventListener('load', function(){
        // console.log(xhr.responseText);
        let result = xhr.responseText;
        result = JSON.parse(result);
        let resultDiv = document.querySelector(".result");
        console.log('dlkdfldfklfdkfd', result);
        resultDiv.innerHTML = result;
    })
}

// naver_btn();

