const {MessageEmbed} = require("discord.js")

module.exports = {
    name: 'invite',
    aliases: [],
    description: 'Generates an invite link for the bot!',
    usage: [],
    catagory: "Misc",
    hidden: false,
    owner: false,
    userPerms: [],
    runPerms: [],
	async execute(message, args) {
        try{
            let inviteURL = await Client.generateInvite(Client.permissions)
            message.channel.send(
                new MessageEmbed()
                .setTitle("Invite Role Bearer to your server")
                .addField("Invite Link",`[Click here to invite!](${inviteURL})`,true)
                .addField("Support Server",`[Click Here to access the support server](https://discord.gg/Zvph3FF)`)
                .addField("Github","[Click here to see the code](https://github.com/BeeFox-sys/roleBearer/)")
                .setImage(await Client.user.avatarURL({size:256}))
                )
        } catch (error) {throw error}
    }
};