exports.type = 'event';
exports.name = 'Ready';
exports.event = 'ready';

exports.callback = () => {
    initTime = startWatch.stop().toString();

    let memUse = process.memoryUsage();
    let [used, total] = [memUse.heapUsed / 1024 / 1024, memUse.heapTotal / 1024 / 1024];

    let ready = `Ready! Took ${initTime}`;
    let mem = `${(used / total * 100).toFixed(3)}% (${used.toFixed(2)}MB / ${total.toFixed(2)}MB)`;

    console.log(ready);
    console.log('Memory usage: ' + mem);

    let channel = client.channels.cache.get(process.env.STARTCHANNEL);
    if (channel) {
        let embed = new Discord.MessageEmbed();
            embed.setColor(0x0096ff);
            embed.setTitle('Startup Information');
            embed.addField('Memory usage', mem);
            embed.addField('Initialization time', initTime);

        channel.send({embeds: [embed]});
    }
}