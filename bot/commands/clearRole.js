const {guilds} = require("../schemas")
const {getGuildDoc} = require ("../utils")

module.exports = {
    name: 'clear',
    aliases: [],
    description: 'Removes all self assignable roles from you',
    usage: ['clear'],
    catagory: "Self Assign",
    hidden: false,
    owner: false,
    userPerms: [],
    runPerms: ["MANAGE_ROLES"],
	async execute(message, args) {
        
        let guild = await getGuildDoc(message.guild.id)
        let roles = message.guild.roles.cache.filter(role => guild.roles.has(role.id))

        message.member.roles.remove(roles)

        return message.channel.send(`Cleared your roles`)
    }
};