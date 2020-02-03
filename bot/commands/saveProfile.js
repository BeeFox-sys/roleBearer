const {profiles} = require("../schemas")
const {getGuildDoc} = require("../utils")

module.exports = {
    name: 'save',
    aliases: [],
    description: 'Saves your roles and nickname to a profile',
    usage: ['save <profile name>'],
    catagory: "Profiles",
    hidden: false,
    owner: false,
    userPerms: [],
    runPerms: [],
	async execute(message, args) {
        let profileUser = message.author.id;
        let profileGuild = message.guild.id;
        let guild = await getGuildDoc(profileGuild)
        let profileName = args.join(" ").toLowerCase();
        let profileNickname = message.member.nickname
        let profileRoles = message.member.roles.map(value => value.id).filter(id => guild.roles.has(id))
        if(!profileName) return message.channel.send("Must supply a name!");

        let existing = await profiles.findOne({account: profileUser,
            guild: profileGuild,
            name: profileName})
        let error, newProfile
        if(!existing){
            error, newProfile = await new profiles({
                account: profileUser,
                guild: profileGuild,
                name: profileName,
                nickname: profileNickname,
                roles: profileRoles
            }).save();
        } else {
            existing.roles = profileRoles
            existing.nickname = profileNickname
            error, newProfile = await existing.save()
        }
        
        if(error) throw error;
        return message.channel.send(`Saved current roles and nickname as ${newProfile.name}`)
    }
};