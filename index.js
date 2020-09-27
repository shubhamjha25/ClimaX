const http = require('http');
const fs = require('fs');
const requests = require('requests');

const homeFile = fs.readFileSync("./public/index.html", "utf-8");

const replaceVal = (tempVal, origVal) => {
    let temperature = tempVal.replace("{%tempval%}", origVal.main.temp - 273.15);
    temperature = temperature.replace("{%tempmin%}", origVal.main.temp_min - 273.15);
    temperature = temperature.replace("{%tempmax%}", origVal.main.temp_max - 273.15);
    temperature = temperature.replace("{%location%}", origVal.name);
    temperature = temperature.replace("{%country%}", origVal.sys.country);
    return temperature;
};

const server = http.createServer((req, res) => {
    if(req.url == "/") {
        requests('http://api.openweathermap.org/data/2.5/weather?q=Kolkata&APPID=19d1c47951a0cc61493dff1dc863e430')
        .on('data', function (chunk) {
            const apiData = JSON.parse(chunk);
            const apiDataArray = [apiData];

            const realData = apiDataArray.map(val => replaceVal(homeFile, val)).join(" ");

            res.write(realData);
        })
        .on('end', function (err) {
            if (err) return console.log('connection closed due to errors', err);
            res.end();
        });
    }
});

server.listen(3000, 'localhost');