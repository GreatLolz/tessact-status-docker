const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;

app.use(express.static('public'));

app.get('/uptime', (request, response) => {
    const os = require('os');
    response.json(os.uptime())
});

var imageCount;
fs.readdir('./public/img/pozdrawiam/', (err, files) => {
    imageCount = files.length;
});

app.get('/images', (request, response) => {
    response.json(imageCount);
})

app.listen(port, () => { console.log(`Listening at port ${port}`) });