exports.type = 'command';
exports.name = 'Whois';
exports.calls = ['whois', 'who'];
exports.callback = (message, args) => {
    let user;
if (message.mentions.users.first()) {
user = message.mentions.users.first()
} else {
user = message.member;
}


const embed = new Discord.MessageEmbed()
let userRoles = []

message.guild.roles.cache.forEach(role => {
    if (role.members.has(user)) {
     userRoles.push(role.name)
    }
})

embed.setTitle('About' + user.username)
embed.setImage(user.displayAvatarURL({ dynamic: true }))
embed.addFields([
    {
     name: 'Joined this server at',
     value: new Date(user.joinedTimestamp)
    },
    {
     name: 'Highest Role',
     value: user.roles.hi
    }
])

message.reply(embed)
}