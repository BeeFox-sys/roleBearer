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
                .setDescription(`[Click here to invite!](${inviteURL})`)
                .setImage(await Client.user.avatarURL({size:128}))
                )
        } catch (error) {throw error}
    }
};