module.exports = {
    execute(buttons, button_label, params){
        let button = new buttons.MessageButton()
            .setStyle('url')
            .setURL(params['url'])
            .setLabel(button_label)
            .setID('link')

        return button
    }
}