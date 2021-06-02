module.exports = {
    name: ['setembedcolor'],
    description: 'Set Embed Color',
    use: 'setembedcolor [hex color]',
    example:['setembedcolor #00ffff'],
    notes: 'Set\'s the embed\'s color',
    async execute(settings, message, args) {
        settings.config.color = args[0]
        message.channel.send("Done ✅")
        await settings.fs.writeFile("config.json", JSON.stringify(settings.config, null, 2), function (err) {
                if (err) throw err;
            }
        );
    }
}