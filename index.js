const express = require('express');
const os = require('os');
const fs = require('fs');
const app = express();
const port = 8080;
var highscore;

app.use(express.static('public'));

fs.readFile('./data/lastboot.json', (err, data) => {
    var lastBootTime;
    var currentBootTime;
    if (err) {
        console.log('lastboot.json not detected. Writing file...')
        let lastboot = {
            lastBootTime: Math.floor(Date.now()/1000) - os.uptime(),
            highscore: 0
        }
        fs.writeFile('./data/lastboot.json', JSON.stringify(lastboot), () => {
            lastBootTime = Math.floor(Date.now()/1000) - os.uptime();
            highscore = 0;
        })
    } else {
        console.log('Reading from lastboot.json...')
        dataArray = JSON.parse(data.toString());
        lastBootTime = dataArray['lastBootTime'];
        highscore = dataArray['highscore'];
    }

    currentBootTime = Math.floor(Date.now()/1000) - os.uptime();
    let daysSurvived = Math.floor((currentBootTime - lastBootTime) / (3600*24));
    if (Math.abs(lastBootTime - currentBootTime) > 1) {
        console.log("Detected a system interrupt")
        if (highscore < daysSurvived) {
            console.log(`New server lifetime highscore! Setting new highscore to ${daysSurvived}`);
            highscore = daysSurvived;
            let lastboot = {
                lastBootTime: currentBootTime,
                highscore: highscore
            }

            console.log('Writing to lastboot.json...')
            fs.writeFile('./data/lastboot.json', JSON.stringify(lastboot), (err) => {
                if (err) throw err;
            })
        }
    } else {
        console.log("No system interrupt detected")
    }
});

app.get('/highscore', (request, response) => {
    response.json(highscore);
})

app.get('/uptime', (request, response) => {
    const uptime = os.uptime();
    response.json(uptime);
});

app.get('/images', (request, response) => {
    fs.readdir('./public/img/pozdrawiam/', (err, files) => {
        let index = Math.floor(Math.random() * files.length);
        let randomImage = `./img/pozdrawiam/${files[index]}`;
        response.json(randomImage);
    });
})

app.listen(port, () => { console.log(`Listening at port ${port}`) });