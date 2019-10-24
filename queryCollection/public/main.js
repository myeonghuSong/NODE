function naver_btn (){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/naver');
    xhr.setRequestHeader('Content-Type', "application/json");
    xhr.send(null);

    xhr.addEventListener('load', function(){
        // console.log(xhr.responseText);
        let result = xhr.responseText;
        let resultDiv = document.querySelector(".result");
        console.log('dlkdfldfklfdkfd', result);
        resultDiv.innerHTML = result;
    })
}

// naver_btn();

