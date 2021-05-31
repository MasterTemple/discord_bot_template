module.exports = {
    execute(settings, title, image_url){
        let embed_template = require('./../templates/embeds/default_embed_template')
        let embed = embed_template.execute(settings.config, title, settings.config.github_link, image_url)

        let previous = settings.button_retriever(settings.buttons, 'previous', 'Previous', {})
        let next = settings.button_retriever(settings.buttons, 'next', 'Next', {})
        let back = settings.button_retriever(settings.buttons, 'back', 'Back', {})


        let buttons = [previous, next, back]
        // let sent_message = await message.channel.send({buttons: buttons, embed: })
        //
        // settings.message_info[sent_message.id] = {buttons: buttons}
        // setTimeout(() => delete settings.message_info[sent_message.id], 300000)

        return [buttons, embed]
    }
}