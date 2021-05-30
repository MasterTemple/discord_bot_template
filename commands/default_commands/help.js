module.exports = {
    name: ['help'],
    description: 'Displays help command',
    use: `help`,
    example:[`help`],
    notes: "This command lists all other commands",
    async execute(settings, message, args) {
        console.log('help')
        let default_commands_button = settings.button_retriever(settings.buttons, 'default_commands_button', 'Default Commands', {color: 'green'})
        let admin_commands_button = settings.button_retriever(settings.buttons, 'admin_commands_button', 'Admin Commands', {})
        let dev_commands_button = settings.button_retriever(settings.buttons, 'dev_commands_button', 'Developer Commands', {})
        //message.channel.send('help', {buttons: [default_commands_button, admin_commands_button, dev_commands_button]})
        let buttons = [default_commands_button, admin_commands_button, dev_commands_button]
        let sent_message = await message.channel.send('help', {buttons: buttons, embed: undefined})
        settings.message_info[sent_message.id] = {buttons: buttons}
        setTimeout(() => delete settings.message_info[sent_message.id], 300000) //deletes the info after 5 minutes
    }
}
