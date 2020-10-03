const http = require('http');
const fs = require('fs');
const requests = require('requests');

require('dotenv').config();
console.log();
const { Client }=require('discord.js');

const client=new Client();

client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', () => {
    console.log('I am ready!');
  });
  
/*discord configuration added*/  
  client.on('message', message => {
    var data={};
    //console.log();
  if (message.content.indexOf('!') === 0  && message
  .content
  .substring(1,8)
  .toLowerCase()==='weather')
  {       
   requests(`http://api.openweathermap.org/data/2.5/weather?q=${message.content.substring(9)}&APPID=19d1c47951a0cc61493dff1dc863e430`)
   .on('data', function (chunk) {
    const apiData = JSON.parse(chunk);
   
    message.reply(`\n Current Location : ${apiData.name}
                \nTemperature : ${apiData.main.temp}
                \nFeels Like : ${apiData.main.feels_like}
                \nMax Temperature : ${apiData.main.temp_max}
                \nMin Temperature : ${apiData.main.temp_min}
                \nPressure : ${apiData.main.pressure}
                \nHumidity : ${apiData.main.humidity}
                `)
    .then(() => console.log(`Sent a reply to ${message.author.username}`))
    .catch(console.error);
    });
    }
  });


const homeFile = fs.readFileSync("./public/index.html", "utf-8");



const replaceVal = (tempVal, origVal) => {
    let temperature = tempVal.replace("{%tempval%}", origVal.main.temp - 273.15);
    temperature = temperature.replace("{%tempmin%}", origVal.main.temp_min - 273.15);
    temperature = temperature.replace("{%tempmax%}", origVal.main.temp_max - 273.15);
    temperature = temperature.replace("{%location%}", origVal.name);
    temperature = temperature.replace("{%country%}", origVal.sys.country);
    temperature = temperature.replace("{%tempStatus%}", origVal.weather[0].main);
    return temperature;
};

const server = http.createServer((req, res) => {
    if(req.url == "/") {
        requests('http://api.openweathermap.org/data/2.5/weather?q=bangalore&APPID=19d1c47951a0cc61493dff1dc863e430')
        .on('data', function (chunk) {
            const apiData = JSON.parse(chunk);
            const apiDataArray = [apiData];

            const realData = apiDataArray.map(val => replaceVal(homeFile, val)).join(" ");
               console.log(apiData); 
            res.write(realData);
        })
        .on('end', function (err) {
            if (err) return console.log('connection closed due to errors', err);
            res.end();
        });
    }
});

server.listen(3000, 'localhost');