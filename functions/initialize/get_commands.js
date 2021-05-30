module.exports = {
    execute(settings, command_name, Discord){
        const command_files = settings.fs.readdirSync(`./commands/${command_name}`).filter(file => file.endsWith('.js'));
        settings.client[command_name] = new Discord.Collection()
        for (const file of command_files) {
            const command = require(`./../../commands/${command_name}/${file}`)
            command.name.forEach(function(each_command_name){
                settings.client[command_name].set(each_command_name, command)
            })

        }
    }
}