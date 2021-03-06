const {guilds} = require("../schemas")
const {getGuildDoc,findQuote} = require ("../utils")

module.exports = {
    name: 'add-role',
    aliases: [],
    description: 'Adds a role to self assginable roles',
    usage: ['add-role <catagory> <name...>'],
    catagory: "Self Assign Management",
    hidden: false,
    owner: false,
    userPerms: ["MANAGE_ROLES"],
    runPerms: [],
	async execute(message, args) {
        if(args.length<2) return message.channel.send("You must supply a catagory and a role name!")
        args = await findQuote(args)
        let roleCatagory = args.shift().toLowerCase()
        let roleName = args.join(' ')
        let role = message.guild.roles.cache.find(role => role.name.toLowerCase() == roleName.toLowerCase() || role.name.toLowerCase().replace(/[^\w| ]/g,"") == roleName.toLowerCase().replace(/[^\w| ]/g,""))
        if(!role) return message.channel.send("Invalid role!")
        let guild = await getGuildDoc(message.guild.id)
        guild.roles.set(role.id,roleCatagory)

        let error,newGuild = await guild.save()
        if(error) throw error;
        return message.channel.send(`Added ${role.name} to the ${roleCatagory} catagory`)
    }
};