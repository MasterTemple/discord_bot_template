const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
const buttons = require('discord-buttons')(client)

const button_handler = require(`./functions/handlers/button_handler`)
const button_creator = require(`./functions/buttons/create_button`)
const field_handler = require('./functions/handlers/field_handler')
const search_handler = require('./functions/handlers/search_handler')
const embed_template = require('./templates/embeds/default_embed_template')
const divide_into_fields = require('./functions/format/divide_fields_into_pages')
const get_button_group = require('./functions/buttons/get_button_group')
var config = require('./config.json');


var settings = {
    fs: fs,
    client: client,
    buttons: buttons,
    config: config,
    edit_message: false,
    send_to_dm: false,
    button_creator: button_creator.execute,
    field_handler: field_handler.execute,
    search_handler: search_handler.execute,
    embed_template: embed_template.execute,
    divide_into_fields: divide_into_fields.execute,
    get_button_group: get_button_group.execute,
    message_info: {}
}
//an object to pass around certain common values without creating countless parameters

const initialize_commands = require('./functions/initialize/get_commands')
const command_types = ['default_commands', 'admin_commands', 'dev_commands']
const command_requirements = {
    default_commands: [],
    admin_commands: config.admin_users,
    dev_commands: config.developers
} //imports the list of users that are allowed to use each type of command

command_types.forEach(function(command_type){
    initialize_commands.execute(settings, command_type, Discord) //creates collections of different types of commands
})


client.once('ready', () => {
    console.log(`${config.name} ${parseFloat(config.version).toFixed( 1)} is ready :)`) //logs that the bot is ready
    if(config.startup_status) {
        client.user.setPresence({activity: {name: config.startup_status}}) //sets a status if the bot has one
    }
})


client.on('message', message => {
    if(message.mentions.has(client.user.id)){
        //checks to see if bot was mentioned
        const help_file = require('./commands/default_commands/help')
        help_file.execute(settings, message)
    }
    else if(message.author.id === client.user.id || message.content[0] !== config.prefix){
        //returns if the user is itself or they do not have the prefix
        return
    }

    const args = message.content.slice(config.prefix.length).trim().split(/ +/); //each space is a new argument
    const command_name = args.shift().toLowerCase() //sets the command name equal to the first argument,(what is immediately after the prefix)

    command_types.forEach(function(command_type) {
        if(client[command_type].has(command_name) && (command_requirements[command_type].includes(message.author.id) || command_requirements[command_type].length === 0)){ //checks if the command name exists and if the user has the proper permissions or if it is a default command
            const command = client[command_type].get(command_name) //this is the executable command

            try {
                command.execute(settings, message, args)
            }catch(error){
                console.log(error)
            }
        }
    })

})


client.on('clickButton', async (button) => {
    try {
        button_handler.execute(settings, button)
    }catch(error){
        console.log(error)
        button.defer()
    }
})




client.login(config.token) //logs in
