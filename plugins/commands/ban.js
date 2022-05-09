exports.type = 'command';
exports.name = 'Ban';
exports.calls = ['ban', 'banuser'];
exports.callback = async (message, args) => {
    if (message.mentions.users.first()) {
        if (message.member.permissions.has('BAN_MEMBERS')) {
            try {
                await message.mentions.users.first().ban({ reason: args.splice(2)})
                message.reply(`Banned ${ message.mentions.users.first().username }`)
            } catch(err) {
                message.reply('An error occured! ' + err)
            }
        }
    } else { 
        message.reply('You need to specify a person to ban silly!')
    }
}