module.exports = {
    execute(buttons, button_label, params){
        let link_button = new buttons.MessageButton()
            .setStyle('url')
            .setURL(params['url'])
            .setLabel(button_label)
            .setID('link')

        return link_button
    }
}