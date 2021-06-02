module.exports = {
    name: ['help'],
    description: 'Displays help command',
    use: `help`,
    example:[`help`],
    notes: "This command lists all other commands",
    async execute(settings, message, args) {
        let default_commands_button = settings.button_creator(settings.buttons, 'default_commands_button', 'Default Commands', {style: 'green'})
        let admin_commands_button = settings.button_creator(settings.buttons, 'admin_commands_button', 'Admin Commands', {})
        let dev_commands_button = settings.button_creator(settings.buttons, 'dev_commands_button', 'Developer Commands', {})

        const help_message_embed = require('./../../functions/get_help_message_from_directory')

        let buttons = [default_commands_button, admin_commands_button, dev_commands_button]
        //sends embed with buttons and returns the id
        let sent_message = await message.channel.send({buttons: buttons, embed: help_message_embed.execute(settings.config, 'default_commands', "Default Commands")})
        //creates an object with the message id as the key, storing its button, fields, and the current page
        settings.message_info[sent_message.id] = {buttons: buttons}
        //this object deletes after x minutes
        setTimeout(() => delete settings.message_info[sent_message.id], settings.config.time_out_ms) 
    }
}
