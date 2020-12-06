const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require("fs")
const x = require("express")
const app = x()
const TOKEN = process.env.token || require("./token.json").token
let data = require("./data.js")
let BADWORDS = require("./badword.json")
app.get("/", (r, q)=>{
	q.send("ok, shutup")
})
app.listen(process.env.PORT || 3000, ()=>{})
const commands = [
	{
		prefix : "add",
		action : (msg)=>{
			msg.content = msg.content.toLowerCase()
			if (!msg.member.hasPermission("ADMINISTRATOR")){
				msg.channel.send("Only Admin Command")
				return false
			}
			const words = msg.content.split(" ")
			if(words[2] === "badword"){
				BADWORDS.push(words[3])
				fs.writeFile("./badword.json", JSON.stringify(BADWORDS), (e)=>{
					if(e) throw e
					msg.reply("OK")
				})
			}
			else{
				msg.reply("?????")
			}
		}
	},
	{
		prefix : "eli",
		action : (msg)=>{
			msg.channel.send("eli hug me")
		}
	},
	{
		prefix : "help", 
		action : (msg)=>{
			msg.channel.send(`
Umm, hello, im via.
commands :
	\`~vi add badword (badword)\`
	\`~vi exec (code)\`
				`)
		}
	},
	{
		prefix : "exec",
		action : (msg)=>{
			let m = msg.content.split(" ")
			m[0] = ""
			m[1] = ""
			m = m.join(" ")
			if(m.split("")[1] === "`"){
				const code = m.split("```").join("")
				console.log(code)
				msg.channel.send(code)
			}else{

			}

		}
	}
]
let session = {
	user : "",
	command : ""
}

bot.on("ready", ()=>{
	console.log("Via is awake")
})

bot.on("message", msg => {
	let isOffense = false
	BADWORDS.forEach(r=>{
		r = r.toLowerCase()
		if(msg.content.toLowerCase().search(r) !== -1){
			isOffense = true
		}	
	})
	if(isOffense){
		setTimeout(()=>{
			msg.delete({reason:"Swear word detected!"})
		}, 100)
	}
	else{
		if(msg.content.startsWith("~vi")){
			const prefix = msg.content.split(" ")[1].toLowerCase()
			commands.forEach(cmd=>{
				if(cmd.prefix === prefix){
					cmd.action(msg)
				}
			})

		}
		if(msg.content.toLowerCase().search("via") !== -1){
			msg.reply("Via's here, onii-chan~")

		}
	}
})


bot.login(TOKEN);
