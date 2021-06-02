module.exports = {
    execute(settings, button) {
        /*
        each button has a function in a file in button_functions
        the function file is named after the id
        it returns optional text, buttons, and an embed
        it edits the message

        once i can access the message that button was clicked on i can replace
        let buttons = settings.message_info[button.message.id].buttons
        with
        let buttons = button.message.components
        or whatever
         */

        const button_function = require(`./../buttons/button_functions/${button.id}`)
        const [text, buttons, embed] = button_function.execute(settings, button)
        button.message.edit(text, {buttons: buttons, embed: embed})
        button.defer()

    }
}