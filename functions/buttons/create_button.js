module.exports = {
    execute(buttons, button_id, button_label, params) {
        // const button_file = require(`./../../templates/buttons/create_${button_id}`)
        // return button_file.execute(buttons, button_label, params)
        // const button_file = require(`./../../templates/buttons/default`)
        // return button_file.execute(buttons, button_label, button_id, params)
        let button = new buttons.MessageButton()
            .setStyle('blurple')
            .setLabel(button_label)
            .setID(button_id)

        if(params['style']){
            button.setStyle(params['style'])
        }
        if(params['url']){
            button.setURL(params['url'])
        }

        return button
    }
}
