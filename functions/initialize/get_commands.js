module.exports = {
    execute(settings, command_name, Discord){
        const command_files = settings.fs.readdirSync(`./${command_name}`).filter(file => file.endsWith('.js'));

        for (const file of command_files) {
            const command = require(`./../../${command_name}/${file}`)
            settings.client[command_name] = new Discord.Collection()
            for(var i=0; i < command.name.length; i++) {
                settings.client[command_name].set(command.name[i], command)
            }
        }
    }
}