const {profiles} = require("../schemas")

module.exports = {
    name: 'help',
    aliases: [],
    description: 'Displays commands',
    usage: ['help [command]'],
    catagory: null,
    hidden: false,
    owner: false,
    userPerms: [],
    runPerms: [],
	async execute(message, args) {
        try{
            const data = [];
            data.push('**__Command List__**');
            for (const commandObj of Client.commands) {
                let command = commandObj[1]
                data.push(`\n${Client.config.prefix}**${command.name}** - ${command.description.split("\n")[0]}`)
            }

            data.push("\n\nWords in <angle brackets> are *required parameters*.\nWords in [square brackets] are *optional parameters*.\n**Note that you should not include the brackets in the actual command.**")
            data.push(`\nYou can send \`${Client.config.prefix}help [command name]\` to get info on a specific command!`);
            message.channel.send(data.join(" "))
        } catch (error) {throw error}
    }
};