const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
const buttons = require('discord-buttons')(client)

//const button_handler = require(`./functions/buttons/button_handler`)
var config = require('./config.json');


var settings = {
    fs: fs,
    client: client,
    buttons: buttons,
    config: config,
    edit_message: false,
    send_to_dm: false,
}
//an object to pass around certain common values without creating countless parameters

const initialize_commands = require('./functions/initialize/get_commands')
const command_types = ['default_commands', 'admin_commands', 'dev_commands']
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
    if(message.author.id === client.user.id || message.content[0] !== config.prefix){return} //returns if the user is itself or they do not have the prefix
    const args = message.content.slice(config.prefix.length).trim().split(/ +/); //each space is a new argument
    const command_name = args.shift().toLowerCase() //sets the command name equal to the first argument,(what is immediately after the prefix)

    command_types.forEach(function(command_type) {
        if(client[command_type].has(command_name)){
            const command = client[command_type].get(command_name)
            try {
                command.execute(settings, message, args)
            }catch(error){
                console.log(error)
            }
        }
    })

})


client.login(config.token) //logs in
