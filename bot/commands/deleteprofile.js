const {profiles} = require("../schemas")
const {getGuildDoc} = require("../utils")

module.exports = {
    name: 'delete',
    aliases: [],
    description: 'Deletes a profile',
    usage: ['delete <profile name>'],
    catagory: null,
    hidden: false,
    owner: false,
    userPerms: [],
    runPerms: [],
	async execute(message, args) {
        let profileUser = message.author.id;
        let profileGuild = message.guild.id;
        let profileName = args.join(" ").toLowerCase();

        let error,res = await profiles.deleteOne({account:profileUser,guild:profileGuild,name:profileName})
        
        if(error) throw error;
        return message.channel.send(`Deleted ${profileName}`)
    }
};