let devChannel;

global.messageDevs = message => {
    if (!devChannel) {
        devChannel = client.channels.resolve(process.env.DEVCHANNEL);   
    }

    if (devChannel) {
        devChannel.send(message).catch(console.error);
    } else {
        console.error(`Could not send message to ${devChannel}`);
        console.log(message);
    }
}