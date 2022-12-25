const express = require('express');
const app = express();
const port = 8080;

app.use(express.static('public'));

app.get('/uptime', (request, response) => {
    const os = require('os');
    response.json(os.uptime())
});

app.listen(port, () => { console.log(`Listening at port ${port}`) });
