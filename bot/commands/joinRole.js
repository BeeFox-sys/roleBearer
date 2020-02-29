const {guilds} = require("../schemas")
const {getGuildDoc} = require ("../utils")
const {Collection} = require("discord.js")

module.exports = {
    name: 'join',
    aliases: ['add'],
    description: 'Gives you a self assignable role',
    usage: ['join <name...>'],
    catagory: "Self Assign",
    hidden: false,
    owner: false,
    userPerms: [],
    runPerms: ["MANAGE_ROLES"],
	async execute(message, args) {
        let guild = await getGuildDoc(message.guild.id)
        if(guild.profileMode) return message.channel.send("Sorry! Profile mode is enabled on this server, you cannot edit your roles with this bot")
        if(args.length<1) return message.channel.send("You must supply a role name!")
        let roleName = args.join(' ')

        let role = message.guild.roles.cache.filter(role => guild.roles.has(role.id)).find(role => role.name.toLowerCase() == roleName.toLowerCase() || role.name.toLowerCase().replace(/[^\w|\s]/g,"") == roleName.toLowerCase().replace(/[^\w|\s]/g,""))

        if(!role) return message.channel.send("Invalid role!")
        let roleCat = guild.roles.get(role.id)
        let whitelist = new Collection(guild.whitelist)
        let whitelistRole = whitelist.get(roleCat)
        if(whitelistRole){
            if(!message.member.roles.cache.has(whitelistRole)) return message.channel.send(`I am sorry, you need the ${message.guild.roles.resolve(whitelistRole).name} role to join this role`)
        }
        message.member.roles.add(role)

        return message.channel.send(`Gave you ${role.name}`)
    }
};