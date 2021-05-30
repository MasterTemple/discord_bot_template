module.exports = {
    execute(config, dir, title){
        let embed_template = require('./../templates/embeds/default_embed_template')
        const fs = require('fs')
        let embed = embed_template.execute(config, title, config.github_link, config.bot_icon_url)
        let description = ''

        const command_files = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));
        console.log(command_files)
        command_files.forEach(function(each_command_file){
            const command = require(`./../commands/${dir}/${each_command_file}`)
            description = `${description}**${config.prefix}${command.name.join(`${config.prefix} `)}** ${command.description}\n`
        })
        embed.setDescription(description)
        return embed
    }
}