const uptime = document.querySelector('#uptime');
const days = document.querySelector('#days');
const highscore = document.querySelector('#highscore');
const highscoreElement = document.querySelector('.highscore');

const highscoreResponse = await fetch('/highscore');
if (!highscoreResponse.ok) {
    throw new Error('Couldn\'t fetch server highscore!');
}
var highscoreData = await highscoreResponse.json();

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
    uptimeH = Math.floor(uptimeH);
    uptimeD = Math.floor(uptimeD);

    days.innerHTML = `${uptimeD}`
    uptime.innerHTML = `${uptimeH} hour(s) ${uptimeM} minute(s) and ${uptimeS} second(s)`;
    uptimeData++;

    if (uptimeD >= highscoreData) {
        highscoreElement.style.display = 'none';
    } else {
        highscore.innerHTML = highscoreData;
    }
}

setInterval(uptimeUpdate, 1000);