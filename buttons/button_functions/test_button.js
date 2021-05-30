module.exports = {
    execute(settings, button){

        let text = 'test'
        let buttons = settings.message_info[button.message.id].buttons
        buttons[0].setLabel(`Clicks: ${settings.message_info[button.message.id].clicks++ +1}`)
        let embed = button.message?.embeds[0]

        return [text, buttons, embed]
    }
}