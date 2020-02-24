const Discord = require("discord.js")
const fs = require('fs');
const {userFromMention,humanReadablePermissions,getGuildDoc} = require("./utils")

//Setup Client
const client = new Discord.Client()
global.Client = client
Client.config = require("../config")
//Setup Commands
Client.commands = new Discord.Collection();
Client.permissions = []
const commandFiles = fs.readdirSync('./bot/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    Client.commands.set(command.name, command);
    for (const perm of command.runPerms) {
        if(!Client.permissions.includes(perm)) Client.permissions.push(perm)
    }
}

//setup db
const Mongoose = require("mongoose")
Mongoose.connect(Client.config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
Mongoose.connection
    .on('error',(error)=>{console.error(error);process.exit(1)})
    .once('open', function () {
    console.warn("Connected to database")
});

//Run bot
Client.on('ready', async () => {
    console.log(`Logged in as ${Client.user.tag} (ID: ${Client.user.id})!`);
    console.log(`${Client.guilds.cache.size} servers`);
    Client.oauth = await Client.fetchApplication()
    Client.user.setPresence({ activity: { name: `to ${Client.config.prefix}`, type: `LISTENING` }})
})
//Message handling
.on("message",async message =>{
    if(message.author.bot) return;
    if(!message.guild) return;

    //Get command name
    let args = message.content.split(" ");
    let commandName;
    if(message.content.startsWith(Client.config.prefix)){
        commandName = args.shift().substring(Client.config.prefix.length);
    }
    else if (await userFromMention(args[0]) === Client.user){
        args.shift();
        commandName = args.shift();
    }

    try {
        let command = Client.commands.get(commandName) || Client.commands.find(cmd => cmd.aliases.includes(commandName));
        if(command == null) return;

        // Permissions check
        if(
            (command.owner && Client.oauth.owner != message.author) ||
            (!message.member.hasPermission(command.userPerms))
        ) return

        if(command.runPerms){
            let missingPerms = message.guild.me.permissionsIn(message.channel).missing(command.runPerms)
            if(missingPerms.length > 0){
                let missingReadable = ""
                missingPerms.forEach(perm => {
                    missingReadable += "\n"+humanReadablePermissions[perm]
                })
                return await message.channel.send(`Missing Permissions!**${missingReadable}**\nPlease make sure that ${Client.user} has these permissions, and then try the command again. You may need to ask a server administor to check these.`)
            }
        }

        return command.execute(message, args)

    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

})
.on('roleDelete',async role => {
    let guild = await getGuildDoc(role.guild.id)
    guild.roles.delete(role.id)
    let whitelist = new Discord.Collection(guild.whitelist)
    let wlrole = whitelist.findKey(val => val === role.id)
    guild.whitelist.delete(wlrole)
    guild.save()

})
//role deletetion handeler

.login(Client.config.token)