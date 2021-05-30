module.exports = {
    name: ['help'],
    description: 'Displays help command',
    use: `help`,
    example:[`help`],
    notes: "This command lists all other commands",
    async execute(settings, message, args) {
        let default_commands_button = settings.button_retriever(settings.buttons, 'default_commands_button', 'Default Commands', {color: 'green'})
        let admin_commands_button = settings.button_retriever(settings.buttons, 'admin_commands_button', 'Admin Commands', {})
        let dev_commands_button = settings.button_retriever(settings.buttons, 'dev_commands_button', 'Developer Commands', {})

        const help_message_embed = require('./../../functions/get_help_message_from_directory')

        let buttons = [default_commands_button, admin_commands_button, dev_commands_button]
        let sent_message = await message.channel.send({buttons: buttons, embed: help_message_embed.execute(settings.config, 'default_commands', "Default Commands")})

        settings.message_info[sent_message.id] = {buttons: buttons}
        setTimeout(() => delete settings.message_info[sent_message.id], 300000) //deletes the info after 5 minutes
    }
}
