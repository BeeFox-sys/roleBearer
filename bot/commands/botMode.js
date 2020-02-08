const {guilds} = require("../schemas")
const {getGuildDoc} = require ("../utils")

module.exports = {
    name: 'bot-mode',
    aliases: ['mode'],
    description: 'Toggles between profile mode and roles mode\nProfile mode disables the join/leave roles command, only enabling the profile saving. You still need to add roles to the roles list, as roles not added will not be saved. This mode is good for if you have another bot managing roles, and only wish to use the profile ability.\nRoles mode will enable the join/leave roles command, allowing users to manage their own roles.',
    usage: ['bot-mode <role/profile>'],
    catagory: "Self Assign Management",
    hidden: false,
    owner: false,
    userPerms: ["MANAGE_ROLES"],
    runPerms: [],
	async execute(message, args) {
        let guild = await getGuildDoc(message.guild.id)
        if(args.length<1) return message.channel.send(`Current mode: ${guild.mode ? "profile. Self managing roles with role bearer is disabled":"role. Self managing roles with role bearer is enabled"}`)
        if(args[0].toLowerCase() == "role"){
            guild.profileMode = false
        } else if(args[0].toLowerCase() == "profile"){
            guild.profileMode = true
        } else {
            return message.channel.send("Argument must be `role` or `profile`")
        }
        let error,newGuild = await guild.save()
        if(error) throw error;
        return message.channel.send(`Mode set to: ${newGuild.profileMode ? "profile. Self managing roles with role bearer is now disabled":"role. Self managing roles with role bearer is now enabled"}`)
    }
};