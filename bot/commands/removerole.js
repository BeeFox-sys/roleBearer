const {guilds} = require("../schemas")
const {getGuildDoc} = require ("../utils")

module.exports = {
    name: 'remove-role',
    aliases: ['remove'],
    description: 'removes a role from self assginable roles',
    usage: ['add-role <name...>'],
    catagory: null,
    hidden: false,
    owner: false,
    userPerms: [],
    runPerms: [],
	async execute(message, args) {
        if(args.length<1) return message.channel.send("You must supply a role name!")
        let roleName = args.join(' ')
        let role = message.guild.roles.find(role => role.name.toLowerCase() == roleName.toLowerCase())
        if(!role) return message.channel.send("Invalid role!")
        let guild = await getGuildDoc(message.guild.id)
        guild.roles.delete(role.id)

        let error,newGuild = await guild.save()
        if(error) throw error;
        return message.channel.send(`Removed ${role.name} from the self assignable roles`)
    }
};