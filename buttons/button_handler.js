module.exports = {
    execute(settings, button) {
        /*
        each button has a function in a file in button_functions
        the function file is named after the id
        it returns optional text, buttons, and an embed
        it edits the message
         */
        const button_function = require(`./button_functions/${button.id}`)
        const [text, buttons, embed] = button_function.execute(settings, button)
        button.message.edit(text, {buttons: buttons, embed: embed})
        button.defer()

    }
}