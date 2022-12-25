const uptime = document.querySelector('#uptime');
const images = document.querySelector('#images');
const days = document.querySelector('#days');
const loading = document.querySelector('.loading-screen');

const imagesResponse = await fetch('/images');
if (!imagesResponse.ok) {
    throw new Error('Couldn\'t fetch server images!');
}
var imageData = await imagesResponse.json();

var randomImg = Math.floor(Math.random() * imageData) + 1;
images.src = `./img/pozdrawiam/${randomImg}.png`;

var randomDelay = Math.random() * 3;
loading.style.animationDelay = `${randomDelay + 1}s`;

const uptimeResponse = await fetch('/uptime');
if (!uptimeResponse.ok) {
    throw new Error('Couldn\'t fetch server uptime!');
}
var uptimeData = await uptimeResponse.json();

async function uptimeUpdate() {
    var uptimeS = uptimeData;
    var uptimeM = uptimeS/60;
    var uptimeH = uptimeM/60;
    var uptimeD = uptimeH/24;

    uptimeS = Math.floor(uptimeS)%60;
    uptimeM = Math.floor(uptimeM)%60;
    uptimeH = Math.floor(uptimeH)%60;
    uptimeD = Math.floor(uptimeD)%24;

    days.innerHTML = `${uptimeD}`
    uptime.innerHTML = `${uptimeH} hour(s) ${uptimeM} minute(s) and ${uptimeS} second(s)`;
    uptimeData++;
}

setInterval(uptimeUpdate, 1000);