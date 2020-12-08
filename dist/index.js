var Discord = require('discord.js');
var bot = new Discord.Client();
var fs = require("fs");
var x = require("express");
var app = x();
var vm = require("vm");
var TOKEN = process.env.token || require("../token.json").token;
var data = require("./data");
var BADWORDS = require("../badword.json");
app.get("/", function (r, q) {
    q.send("ok, shutup");
});
app.listen(process.env.PORT || 3000, function () { });
var commands = [
    {
        prefix: "add",
        action: function (msg) {
            msg.content = msg.content.toLowerCase();
            if (!msg.member.hasPermission("ADMINISTRATOR")) {
                msg.channel.send("Only Admin Command");
                return false;
            }
            var words = msg.content.split(" ");
            if (words[2] === "badword") {
                BADWORDS.push(words[3]);
                fs.writeFile("./badword.json", JSON.stringify(BADWORDS), function (e) {
                    if (e)
                        throw e;
                    msg.reply("OK");
                });
            }
            else {
                msg.reply("?????");
            }
        }
    },
    {
        prefix: "eli",
        action: function (msg) {
            msg.channel.send("eli hug me");
        }
    },
    {
        prefix: "help",
        action: function (msg) {
            msg.channel.send("\nUmm, hello, im via.\ncommands :\n\t`~vi add badword (badword)`\n\t`~vi exec (code)`\n\t\t\t\t");
        }
    },
    {
        prefix: "exec",
        action: function (msg) {
            var m = msg.content.split(" ");
            m[0] = "";
            m[1] = "";
            m = m.join(" ");
            var code = m;
            code = code.split("");
            code[0] = "";
            code[1] = "";
            code[2] = "";
            code[3] = "";
            code[4] = "";
            code[code.length - 1] = "";
            code[code.length - 2] = "";
            code[code.length - 3] = "";
            code = code.join("");
            console.log(code);
            var context = {
                bot: bot
            };
            vm.createContext(context);
            vm.runInContext(code, context);
        }
    }
];
var session = {
    user: "",
    command: ""
};
bot.on("ready", function () {
    console.log("Via is awake");
});
bot.on("message", function (msg) {
    var isOffense = false;
    BADWORDS.forEach(function (r) {
        r = r.toLowerCase();
        if (msg.content.toLowerCase().search(r) !== -1) {
            isOffense = true;
        }
    });
    if (isOffense) {
        setTimeout(function () {
            msg.delete({ reason: "Swear word detected!" });
        }, 100);
    }
    else {
        if (msg.content.startsWith("~vi")) {
            var prefix_1 = msg.content.split(" ")[1].toLowerCase();
            commands.forEach(function (cmd) {
                if (cmd.prefix === prefix_1) {
                    cmd.action(msg);
                }
            });
        }
        if (msg.content.toLowerCase().startsWith("via") || msg.content.toLowerCase().endsWith("via")) {
            if (msg.author.bot) {
                return 0;
            }
            msg.reply("Via's here, onii-chan~");
        }
    }
});
bot.login(TOKEN);
