

async function userFromMention(mention){
        if (!mention) return null;
        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
            return Client.users.fetch(mention);
        }
        return null;
}

async function capatalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

humanReadablePermissions = {
    ADMINISTRATOR:"Administrator",
    CREATE_INSTANT_INVITE:"Create Invite",
    KICK_MEMBERS:"Kick Members",
    BAN_MEMBERS:"Ban Members",
    MANAGE_CHANNELS:"Manage Channels",
    MANAGE_GUILD:"Manage Server",
    ADD_REACTIONS:"Add Reactions",
    VIEW_AUDIT_LOG:"View Audit Log",
    PRIORITY_SPEAKER:"Priority Speaker",
    VIEW_CHANNEL:"Read Text Channels & See Voice Channels",
    SEND_MESSAGES:"Send Messages",
    SEND_TTS_MESSAGES:"Send TTS Messages",
    MANAGE_MESSAGES:"Manage Messages",
    EMBED_LINKS:"Embed Links",
    ATTACH_FILES:"Attach Files",
    READ_MESSAGE_HISTORY:"Read Message History",
    MENTION_EVERYONE:"Mention Everyone",
    USE_EXTERNAL_EMOJIS:"Use External Emoji",
    CONNECT:"Connect",
    SPEAK:"Speak",
    MUTE_MEMBERS:"Mute Members",
    DEAFEN_MEMBERS:"Defen Members",
    MOVE_MEMBERS:"Move Members",
    USE_VAD:"Use Voice Activity",
    CHANGE_NICKNAME:"Change Nickname",
    MANAGE_NICKNAMES:"Manage Nickname",
    MANAGE_ROLES:"Manage Roles",
    MANAGE_WEBHOOKS:"Manage Webhooks",
    MANAGE_EMOJIS:"Manage Emoji",
}

const {guilds} = require("./schemas")
async function getGuildDoc(id){
    let guild = await guilds.findOne({id:id})
    if(!guild){
        guild = new guilds({id:id})
    }
    return guild
}


module.exports = {
    userFromMention: userFromMention,
    humanReadablePermissions: humanReadablePermissions,
    getGuildDoc: getGuildDoc,
    capatalizeFirst: capatalizeFirst
}