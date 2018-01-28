'use strict';
let xnr = new XMLHttpRequest();
addUser.addEventListener('click', () => {
    xnr.open('GET', 'https://randomuser.me/api');
    xnr.onreadystatechange = () => {
        if (xnr.status == 200 && xnr.readyState === 4) {
            let arrUsers = JSON.parse(xnr.responseText);

            UI(arrUsers.results[0]);


        }
    }
    xnr.send();
});

let arr = [];
function UI(user) {
  
    let userMain = document.getElementById('users');
    userMain.scrollTop = userMain.scrollHeight;
    let userDiv =document.createElement('div');
    userDiv.classList.add('userDiv');
    let name = user['name'];
    let foto = user['picture'];
    let avatar = document.createElement('div');
    avatar.classList.add("avatar");
    
    let img = document.createElement("IMG");
    img.src = foto['medium'];
    let userInf = document.createElement('div');
    userInf.classList.add('userInf');
    userInf.innerHTML = `${name['last'][0].toUpperCase() + name['last'].slice(1,name['last'].length) } 
    ${name['first'][0].toUpperCase() + name['first'].slice(1,name['first'].length)}`;

   let userAbout = document.createElement('div');
   userAbout.classList.add('userAbout');
   let city = user['location'];
userAbout.innerHTML = `City:${city['city'][0].toUpperCase() + city['city'].slice(1,city.length)}<br> street:${city['street'] }
 <br>Phone:${user['cell']}`
 

avatar.appendChild(img);
    userDiv.appendChild(avatar);
    userInf.appendChild(userAbout);
    userDiv.appendChild(userInf);
    userMain.appendChild(userDiv);
    arr.push(user);
    console.log(arr);
    console.log(user['name']);
}