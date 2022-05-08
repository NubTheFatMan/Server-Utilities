exports.type = 'command';
exports.name = "Hotloader";
exports.calls = ['hotload', 'reload'];
exports.allowed = devs;
exports.callback = (message, args) => {
    if (args.length === 0) {
        message.reply('You need to specify a plugin to reload!').catch(console.error);
        return;
    }

    plugin = args.join(' ');
    if (plugin === '*') {
        try {
            let reloaded = requireAll('./plugins');
            message.reply(`Reloaded **${reloaded.length}** plugins`).catch(console.error);
            refreshEvents();
        } catch (err) {
            message.reply(`An error occured while reloading plugins: \`\`\`\n${err.stack}\`\`\``).catch(console.error);
        }
    } else {
        // If reloading an event, we need to remove the client listener callback so it doesn't double up
        for (let [name, plug] of eventHandlers) {
            if (plug.file === plugin) {
                client.removeListener(plug.event, plug.callback);
            }
        }

        try {
            let plug = loadFile(plugin);
            if (plug.type === 'event') {
                eventHandlers.set(plug.name, plug);
                client.on(plug.event, plug.callback);
                message.reply(`Reloaded event \`${plug.name}\``).catch(console.error);
            } else if (plug.type === 'command') {
                commands.set(plug.name, plug);
                message.reply(`Reloaded command \`${plug.name}\``).catch(console.error);
            } else {
                message.reply(`Plugin doesn't have a command or event structure, but file is running.`).catch(console.error);
            }
        } catch (err) {
            message.reply(`An error occured while reloading plugin: \`\`\`\n${err.stack}\`\`\``).catch(console.error);
        }
    }
}