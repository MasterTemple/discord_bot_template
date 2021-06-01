module.exports = {
    execute(settings, title, image_url){
        //creates embed from template
        //let embed_template = require('./../templates/embeds/default_embed_template')
        let embed = settings.embed_template.execute(settings.config, title, settings.config.github_link, image_url)
        //creates 3 buttons
        let previous = settings.button_retriever(settings.buttons, 'previous', 'Previous', {})
        let next = settings.button_retriever(settings.buttons, 'next', 'Next', {})

        let buttons = [previous, next]
        // let back = settings.button_retriever(settings.buttons, 'back', 'Back', {})

        // let buttons = [previous, next, back]

        return [buttons, embed]
    }
}