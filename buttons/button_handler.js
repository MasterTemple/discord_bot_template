module.exports = {
    execute(settings, button) {

        const button_function = require(`./button_functions/${button.id}`)
        const [text, buttons, embed] = button_function.execute(settings, button)

        button.message.edit(text, {buttons: buttons, embed: embed})
        button.defer()

    }
}