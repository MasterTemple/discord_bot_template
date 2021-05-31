module.exports = {
    name: ['admin'],
    description: 'Displays admin help command',
    use: 'admin',
    example:['admin'],
    notes: 'This command lists all other commands',
    async execute(settings, message, args) {
        let default_commands_button = settings.button_retriever(settings.buttons, 'default_commands_button', 'Default Commands', {})
        let admin_commands_button = settings.button_retriever(settings.buttons, 'admin_commands_button', 'Admin Commands', {color: 'green'})
        let dev_commands_button = settings.button_retriever(settings.buttons, 'dev_commands_button', 'Developer Commands', {})

        const help_message_embed = require('./../../functions/get_help_message_from_directory')

        let buttons = [default_commands_button, admin_commands_button, dev_commands_button]
        let sent_message = await message.channel.send({buttons: buttons, embed: help_message_embed.execute(settings.config, 'admin_commands', "Admin Commands")})

        settings.message_info[sent_message.id] = {buttons: buttons}
        setTimeout(() => delete settings.message_info[sent_message.id], settings.config.time_out_ms) 
    }
}