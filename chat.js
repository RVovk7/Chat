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

function getM(a){
    xnrMessage.open('GET', 'http://www.randomtext.me/api/gibberish/p-5/5-15');
    xnrMessage.onreadystatechange = () => {
        if (xnrMessage.status == 200 && xnrMessage.readyState === 4) {
            let arrMessage = JSON.parse(xnrMessage.responseText);
             message(a,arrMessage['text_out']);
        }
    }
    xnrMessage.send();
} 
let arrUsr = [];
function UI(user) {

    let userMain = document.getElementById('users');
    userMain.scrollTop = userMain.scrollHeight;
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
    arrUsr.push(user);
    getM(arrUsr);
}
function message(users,mess){
  
console.log(mess);
}