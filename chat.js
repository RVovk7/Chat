'use strict';
let xnrUser = new XMLHttpRequest();
addUser.addEventListener('click', () => {
    xnrUser.open('GET', 'https://randomuser.me/api');
    xnrUser.onreadystatechange = () => {
        if (xnrUser.status == 200 && xnrUser.readyState === 4) {
            let arrUsers = JSON.parse(xnrUser.responseText);
            UI(arrUsers.results[0]); 
        }
    }
    xnrUser.send();
});

let xnrMessage = new XMLHttpRequest();

setInterval(function () {
    xnrMessage.open('GET', 'http://www.randomtext.me/api/gibberish/p-1/5-10');
    xnrMessage.onreadystatechange = () => {
        if (xnrMessage.status == 200 && xnrMessage.readyState === 4) {
            let arrMessage = JSON.parse(xnrMessage.responseText);
            message(arrMessage['text_out'])
        }
    }
    xnrMessage.send();
}, randM());

let arrUsr = [];
function UI(user) {
    let userMain = document.getElementById('users');
    userMain.scrollTop = userMain.scrollHeight;   /////scrol to top
    let userDiv = document.createElement('div');
    userDiv.classList.add('userDiv');
    let name = user['name'];
    let foto = user['picture'];
    let avatar = document.createElement('div');
    avatar.classList.add("avatar");

    let img = document.createElement("IMG");
    img.src = foto['medium'];
    let userInf = document.createElement('div');
    userInf.classList.add('userInf');
    userInf.innerHTML = `${name['last'][0].toUpperCase() + name['last'].slice(1, name['last'].length)} 
    ${name['first'][0].toUpperCase() + name['first'].slice(1, name['first'].length)}`;

    let userAbout = document.createElement('div');
    userAbout.classList.add('userAbout');
    let city = user['location'];
    userAbout.innerHTML = `City:${city['city'][0].toUpperCase() + city['city'].slice(1, city.length)}<br> Street:${city['street']}
    <br>Phone:${user['cell']}`

    avatar.appendChild(img);
    userDiv.appendChild(avatar);
    userInf.appendChild(userAbout);
    userDiv.appendChild(userInf);
    userMain.appendChild(userDiv);
    arrUsr.push(user);   ////user arr push
}
function randM() {
    return Math.floor(Math.random() * (10000 - 2000 + 1)) + 2000;
}
function randUser() {
    return Math.floor(Math.random() * (arrUsr.length - 1 - 0 + 1)) + 0;
}

function message(text) {
    if (arrUsr.length !== 0) {
        let user = arrUsr[randUser()];
        let messageMain = document.getElementById('chat');
        let messageDiv = document.createElement('div');

        messageMain.scrollTop = messageMain.scrollHeight;
        messageDiv.classList.add('userDiv');
        let login = user['login'];
        let foto = user['picture'];
        let avatar = document.createElement('div');
        avatar.classList.add("avatar");
        let img = document.createElement("IMG");
        img.src = foto['medium'];
        let mInf = document.createElement('div');
        mInf.classList.add('mInf');

        let date = new Date();
        let options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        }
        /////age calculation
        let d = date.toLocaleString("ua-UA", options).split('/').reverse();
        let age = user.dob.split(' ');
        age.length = 1;
        let age0 = age.toString().split('-');
        let ageUser = 0;
        if (d[2] < age0[1] || d[2] == age0[0] && d[1] <= age0[2]) {
            ageUser = d[0] - age0[0] - 1;
        }
        else {
            ageUser = d[0] - age0[0];
        }

        ///////////
        mInf.innerHTML = `${login['username']} (Age:${ageUser})`;
        let userAbout = document.createElement('div');
        userAbout.classList.add('messageAbout');
        userAbout.innerHTML = text;

        let time = new Date();
        let op = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        }
        let timeD = document.createElement('div');
        timeD.classList.add('time');
        let t = time.toLocaleString("ua-UA", op);
        timeD.innerHTML = t;

        avatar.appendChild(img);
        messageDiv.appendChild(avatar);
        mInf.appendChild(userAbout);
        mInf.appendChild(timeD);
        messageDiv.appendChild(mInf);
        messageMain.appendChild(messageDiv);
    }
}
