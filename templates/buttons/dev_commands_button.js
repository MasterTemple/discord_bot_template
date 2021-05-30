module.exports = {
    execute(buttons, button_label, params){
        let button = new buttons.MessageButton()
            .setStyle('blurple')
            .setLabel(button_label)
            .setID('dev_commands_button')

        if(params['color']){
            button.setStyle(params['color'])
        }

        return button
    }
}