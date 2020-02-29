const {guilds} = require("../schemas")
const {getGuildDoc} = require ("../utils")

module.exports = {
    name: 'add-multi',
    aliases: [],
    description: 'Adds multuiple roles to self assginable roles, each line being a new catagory role pair',
    usage: ['add-role <catagory> <name...>'],
    catagory: "Self Assign Management",
    hidden: false,
    owner: false,
    userPerms: ["MANAGE_ROLES"],
    runPerms: [],
	async execute(message, args) {
        let guild = await getGuildDoc(message.guild.id)
        let lines = args.join(" ").split("\n")
        let returnMessage = ""
        let lineNum = 0
        for(line of lines){
            lineNum++
            let info = line.split(" ")
            if(info.length < 2) { returnMessage+=`\`${line||"[no data entered]"}\` Not enough arguments, must supply a catagory and a role\n`; continue }
            let roleCatagory = info.shift().toLowerCase()
            let roleName = info.join(' ')
            let role = message.guild.roles.cache.find(role => role.name.toLowerCase() == roleName.toLowerCase() || role.name.toLowerCase().replace(/[^\w|\s]/g,"") == roleName.toLowerCase().replace(/[^\w|\s]/g,""))
            if(!role) { returnMessage+=`\`${line}\` Not a valid role!\n`; continue }
            guild.roles.set(role.id,roleCatagory)
            returnMessage+=`\`${line}\` Added **${role.name}** to the **${roleCatagory}** catagory\n`
        }

        let error,newGuild = await guild.save()
        if(error) throw error;
        return message.channel.send(returnMessage,{split:true})
    }
};