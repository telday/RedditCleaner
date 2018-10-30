const Discord = require('discord.js');
const fs = require('fs');
const rp = require('request-promise');
const client = new Discord.Client();

/**
 * Extracts the name of the reddit post from the reddit link
 *
 * parameters:
 * 	text - The reddit link to extract from
 *
 * return:
 * 	Returns the name of the post or -1 if it was not a reddit link
 */
function extractThreadName(text){
	let pattern = new RegExp("(comments\/*)[a-z A-Z 0-9]+");
	let pattern2 = new RegExp("(\/)[a-z A-Z 0-9]+");
	let matching = text.match(pattern);

	if (!matching){
		return -1;
	}
	matching = matching[0].match(pattern2)[0];
	matching = matching.slice(1);

	return matching;
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	// Checks if the link was to reddit and gets the reddit posts name
	let name = extractThreadName(msg.content);
	if (name == -1){
		return;
	}
	let url = "https://www.reddit.com/by_id/t3_" + name + ".json";

	rp({uri:url, json:true, raw_json:1})
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
