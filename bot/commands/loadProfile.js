const {profiles} = require("../schemas")
const {getGuildDoc} = require("../utils")

module.exports = {
    name: 'load',
    aliases: [],
    description: 'Loads your roles and nickname from a profile\nSadly due to discord limitations, owners cannot have their nicknames set',
    usage: ['load <profile name>'],
    catagory: "Profiles",
    hidden: false,
    owner: false,
    userPerms: [],
    runPerms: ["MANAGE_NICKNAMES","MANAGE_ROLES"],
	async execute(message, args) {
        let profileName = args.join(" ").toLowerCase();
        if(!profileName) return message.channel.send("Must supply a name!");
        let guild = await getGuildDoc(message.guild.id)
        let profile = await profiles.findOne({account: message.author.id,
            guild: message.guild.id,
            name: profileName})
        

        if(!profile) return message.channel.send("Profile does not exist!")
        let user = message.member
        let userHighest = user.roles.highest
        let botHighest = message.guild.me.roles.highest

        if(botHighest.comparePositionTo(userHighest) <= 0) return message.channel.send("Sadly, I cannot change your roles as my roles position is bellow/equal to yours")

        if(user != message.guild.owner) await user.setNickname(profile.nickname || " ")
        await user.roles.remove(Array.from(guild.roles.keys()).filter(id=>!profile.roles.includes(id)))
        await user.roles.add(profile.roles).catch()
        
        return message.channel.send(`Loaded roles and nickname from ${profile.name}`)
    }
};