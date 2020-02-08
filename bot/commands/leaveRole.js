const {guilds} = require("../schemas")
const {getGuildDoc} = require ("../utils")

module.exports = {
    name: 'leave',
    aliases: [],
    description: 'Removes from you a self assignable role',
    usage: ['leave <name...>'],
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

        let role = message.guild.roles.filter(role => guild.roles.has(role.id)).find(role => role.name.toLowerCase() == roleName.toLowerCase())

        if(!role) return message.channel.send("Invalid role!")
        message.member.roles.remove(role)

        return message.channel.send(`Removed you from ${role.name}`)
    }
};