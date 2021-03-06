const {guilds} = require("../schemas")
const {getGuildDoc} = require ("../utils")

module.exports = {
    name: 'whitelist',
    aliases: [],
    description: 'Whitelists a catagory with a role',
    usage: ['whitelist <add/remove> <catagory> <role name...>'],
    catagory: "Self Assign Management",
    hidden: false,
    owner: false,
    userPerms: ["MANAGE_ROLES"],
    runPerms: [],
	async execute(message, args) {
        if(args.length<2) return message.channel.send("You must supply a mode, a catagory, and a role name!")
        let mode = args.shift().toLowerCase()
        let roleCatagory = args.shift().toLowerCase()
        let roleName = args.join(' ')
        let role = message.guild.roles.cache.find(role => role.name.toLowerCase() == roleName.toLowerCase())
        if(mode != "add" && mode != "remove") return message.channel.send("Invalid mode!")
        if(!role) return message.channel.send("Invalid role!")
        let guild = await getGuildDoc(message.guild.id)
        let returnMessage
        if(mode == "add"){
            guild.whitelist.set(roleCatagory,role.id)
            returnMessage = `Whitelisted ${role.name} to the ${roleCatagory} catagory. Only people with the ${role.name} role will be able to join from this catagory`
        } else {
            guild.whitelist.delete(roleCatagory)
            returnMessage = `Removed whitelist from ${roleCatagory}`
        }

        let error,newGuild = await guild.save()
        if(error) throw error;
        return message.channel.send(returnMessage)
    }
};