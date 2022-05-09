global.Stopwatch = require('@sapphire/stopwatch').Stopwatch;

global.startWatch = new Stopwatch();
global.initTime = null;

global.Discord = require('discord.js');
global.fs      = require('fs');

require('dotenv').config();

let intents = Discord.Intents.FLAGS;
global.client = new Discord.Client({
    intents: [
        intents.GUILDS,
        intents.GUILD_MEMBERS,
        intents.GUILD_BANS,
        intents.GUILD_MESSAGES,
        intents.GUILD_MESSAGE_REACTIONS,
        intents.DIRECT_MESSAGES
    ]
});

global.commands = new Map();
global.eventHandlers = new Map();
global.plugins = new Map();

global.loadFile = file => {
    if (require.cache[require.resolve(file)]) {
        delete require.cache[require.resolve(file)];
    }

    let plugin = require(file);
    if (plugin.type === 'command') {
        commands.set(plugin.name, plugin);
    } else if (plugin.type === 'event') {
        plugin.file = file;
        eventHandlers.set(plugin.name, plugin);
    }
    plugins.set(file, plugin);

    return plugin;
}

global.requireAll = dir => {
    let plugins = [];
    fs.readdirSync(dir).forEach(file => {
        let path = dir + '/' + file;
        if (fs.statSync(path).isDirectory()) {
            plugins.push(...requireAll(path));
        } else {
            if (path.endsWith('.js')) {
                plugins.push(loadFile(path));
            }
        }
    });
    return plugins;
}

require('./vars.js'); // This takes priority before any plugins

requireAll('./plugins');

refreshEvents();

client.login();