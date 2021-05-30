module.exports = {
    name: ['test'],
    description: 'Test a feature',
    use: `test`,
    example:[`test`],
    notes: "This is a command used for testing purposes",
    execute(settings, message, args) {
        message.channel.send('tested')
    }
}
