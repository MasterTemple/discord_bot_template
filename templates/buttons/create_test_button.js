module.exports = {
    execute(buttons, button_label, params){
        let button = new buttons.MessageButton()
            .setStyle('blurple')
            .setLabel(button_label)
            .setID('test_button')

        return button
    }
}