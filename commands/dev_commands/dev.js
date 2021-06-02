module.exports = {
    name: ['dev'],
    description: 'Displays dev help command',
    use: 'dev',
    example:['dev'],
    notes: 'This command lists all other commands',
    async execute(settings, message, args) {
        let default_commands_button = settings.button_creator(settings.buttons, 'default_commands_button', 'Default Commands', {})
        let admin_commands_button = settings.button_creator(settings.buttons, 'admin_commands_button', 'Admin Commands', {})
        let dev_commands_button = settings.button_creator(settings.buttons, 'dev_commands_button', 'Developer Commands', {style: 'green'})

        const help_message_embed = require('./../../functions/get_help_message_from_directory')

        let buttons = [default_commands_button, admin_commands_button, dev_commands_button]
        let sent_message = await message.channel.send({buttons: buttons, embed: help_message_embed.execute(settings.config, 'dev_commands', "Developer Commands")})

        settings.message_info[sent_message.id] = {buttons: buttons}
        setTimeout(() => delete settings.message_info[sent_message.id], settings.config.time_out_ms) 
    }
}