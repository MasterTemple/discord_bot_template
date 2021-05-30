module.exports = {
    name: ['ping'],
    description: 'Ping',
    use: `ping`,
    example:[`ping`],
    notes: "This command is just a filler command",
    execute(settings, message, args) {
        message.channel.send('pong')
    }
}
