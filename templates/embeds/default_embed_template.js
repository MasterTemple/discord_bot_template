const Discord = require("discord.js");
module.exports = {
    execute(config, embed_title, embed_title_url, embed_thumbnail_url){
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle(embed_title)
            .setURL(embed_title_url)
            .setAuthor(config.name, config.bot_icon_url, embed_title_url)
            .setThumbnail(embed_thumbnail_url)
            .setTimestamp()
            .setFooter(config.footer, config.bot_icon_url);


        return embed
    }
}