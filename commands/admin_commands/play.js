module.exports = {
    name: ['play'],
    description: 'Set what the bot is playing',
    use: `play [args]`,
    example:[`play LEGO Universe`],
    notes: "This command is used to temporarily set the bot's status",
    async execute(settings, message, args) {
        if(args.length === 0){
            settings.client.user.setActivity();
        } else{
            settings.client.user.setPresence({activity: {name: args.join(' ')}});
        }
    }
}
