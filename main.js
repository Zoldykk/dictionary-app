const wordInput = document.querySelector('#wordInput');
const wordInfo = document.querySelector('.wordInfo');
const wordMeaning = document.querySelector('#wordMeaning');
const wordIpa = document.querySelector('#wordIpa');
const audio = document.querySelector('#audio');
const searchBtn = document.querySelector('.searchBtn');
const form = document.querySelector('form');
const errorBox = document.querySelector('.errorBox');

form.addEventListener('submit', (e) =>{
    e.preventDefault()
})

searchBtn.addEventListener('click', () =>{
    if(wordInput.value == ''){
        errorBox.innerHTML = 'Input is Empty'
        wordMeaning.innerHTML = '';
        wordIpa.innerHTML = '';
        audio.removeAttribute('controls')
    }else{
        fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${wordInput.value}?key=f1ccae41-c4a6-49db-91d6-85a46d8d31f8`)
        .then(response => response.json())
        .then(data =>{
            if(data.length == 0){
                errorBox.innerHTML = 'OOPS!! Make sure to spell the word correctly';
                wordMeaning.innerHTML = '';
                wordIpa.innerHTML = '';
                audio.removeAttribute('controls')
            }else{
                wordMeaning.innerHTML = data[0].shortdef[0];
                wordIpa.innerHTML = `Ipa: ${data[0].hwi.prs[0].ipa}`;
                const audioName = data[0].hwi.prs[0].sound.audio;
                const audioNameSubFol = audioName.charAt();
                audio.setAttribute('src', `https://media.merriam-webster.com/soundc11/${audioNameSubFol}/${audioName}.wav?key=f1ccae41-c4a6-49db-91d6-85a46d8d31f8`)
                audio.setAttribute('controls', '')
                audio.setAttribute('class', 'audio')
                wordInfo.appendChild(audio)
                errorBox.innerHTML = ''
            }
        });
    }
    
})

window.addEventListener('DOMContentLoaded', () =>{
    wordInput.value = ''
})


