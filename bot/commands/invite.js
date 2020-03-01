const {MessageEmbed} = require("discord.js")

module.exports = {
    name: 'invite',
    aliases: ['about','info','git','github'],
    description: 'About the bot',
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
                .setDescription(`${Client.user.toString()} is part of the animal familar bot series. A group of bots created for only one task, to allow servers to augment their server with features they like, without having to have many features they do not need. It also allows the bots to be dedicated to one task in order to increase reliablity, quality, and simplicity of the bot`)
                .addField("Invite Link",`[Click here to invite!](${inviteURL})`,true)
                .addField("Support Server",`[Click Here to access the support server](https://discord.gg/pkCYXUB)`)
                .addField("Github","[Click here to see the code](https://github.com/BeeFox-sys/roleBearer/)")
                .setImage(await Client.user.avatarURL({size:256}))
                )
        } catch (error) {throw error}
    }
};