const Discord = require('discord.js');
const fs = require('fs');
const rp = require('request-promise');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	let k = 'https://www.reddit.com/by_id/t3_9semdw.json';
	rp({uri:k, json:true, raw_json:1})
		.then(function(res) {
				console.log(res['data'].children[0].data.url);
		})
		.catch(function(res) {
			console.log('fail');
		});
});

try{
    const token = fs.readFileSync('token.txt', 'utf8');
    client.login(token.slice(0, token.length-1));
}catch (err){
    console.error(err);
}
