const {profiles} = require("../schemas")

module.exports = {
    name: 'help',
    aliases: [],
    description: 'Displays commands',
    usage: ['help [command]'],
    catagory: "Misc",
    hidden: false,
    owner: false,
    userPerms: [],
    runPerms: [],
	async execute(message, args) {
        try{
            const data = [];
            data.push('**__Command List__**');
            let catagories = {
                "Self Assign": "\n*Assign yourself roles*",
                "Profiles": "\n*Save your assigned roles and load them*",
                "Self Assign Management": "\n*Manage the assigned roles*",
                "Misc": ""
            }
            for (const commandObj of Client.commands) {
                let command = commandObj[1]
                catagories[command.catagory] += `\n${Client.config.prefix}**${command.name}** - ${command.description.split("\n")[0]}`
            }
            for (const catagoryName in catagories) {
                if (catagories.hasOwnProperty(catagoryName)) {
                    const catagory = catagories[catagoryName];
                    data.push(`\n\n__${catagoryName}__${catagory}`)
                }
            }

            data.push("\n\nWords in <angle brackets> are *required parameters*.\nWords in [square brackets] are *optional parameters*.\n**Note that you should not include the brackets in the actual command.**")
            data.push(`\nYou can send \`${Client.config.prefix}help [command name]\` to get info on a specific command!`);
            message.channel.send(data.join(" "))
        } catch (error) {throw error}
    }
};