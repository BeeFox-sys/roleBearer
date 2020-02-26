module.exports = {
    name: 'guild-roles',
    aliases: [],
    description: 'lists the guild roles',
    usage: ['list'],
    catagory: "Misc",
    hidden: false,
    owner: false,
    userPerms: ["MANAGE_ROLES"],
    runPerms: ["MANAGE_ROLES"],
	async execute(message, args) {
        let roles = message.guild.roles.cache
        let rolesMessage = `> **All ${message.guild.name} Roles**`
        for(role of roles){
            rolesMessage += `\n• \`${role[1].name}\``
        }
        message.channel.send(rolesMessage,{split:true})
        
    }
};



