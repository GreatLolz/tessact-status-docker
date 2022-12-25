const uptime = document.querySelector('#uptime');
const images = document.querySelector('#images');
const days = document.querySelector('#days');

var random = Math.floor(Math.random() * 6) + 1;
images.src = `./img/pozdrawiam/${random}.png`

async function fetchUptime() {
    const response = await fetch('/uptime');

    if (!response.ok) {
        throw new Error('Couldn\'t fetch server uptime!');
    }

    const data = await response.json();

    var uptimeS = data;
    var uptimeM = uptimeS/60;
    var uptimeH = uptimeM/60;
    var uptimeD = uptimeH/24;

    uptimeS = Math.floor(uptimeS)%60;
    uptimeM = Math.floor(uptimeM)%60;
    uptimeH = Math.floor(uptimeH)%60;
    uptimeD = Math.floor(uptimeD)%24;

    days.innerHTML = `${uptimeD}`
    uptime.innerHTML = `${uptimeH} hour(s) ${uptimeM} minute(s) and ${uptimeS} second(s)`;
}

setInterval(fetchUptime, 1000);