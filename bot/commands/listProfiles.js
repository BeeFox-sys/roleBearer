const {profiles} = require("../schemas")
const Discord = require("discord.js")
const {escapeMarkdown} = Discord.Util


module.exports = {
    name: 'profiles',
    aliases: [],
    description: 'Lists your profiles',
    usage: ['profiles'],
    catagory: null,
    hidden: false,
    owner: false,
    userPerms: [],
    runPerms: [],
	async execute(message, args) {
        let profileList = await profiles.find({guild:message.guild.id,account:message.author.id})
        let msg = `**__${escapeMarkdown(message.member.displayName)}'s profiles__**`
        for (const profile of profileList) {
            msg += `\n${profile.name}`
        }
        return message.channel.send(msg,{split:{prepend:`**__${message.member.displayName}'s profiles__**`}})
    }
};