module.exports = {
    execute(settings, button) {
        // const button_files = settings.fs.readdirSync(`./button_identifiers`).filter(file => file.endsWith('.js'))
        //
        // for (const file of button_files) {
        //     //const button_function = require(`./${file}`)
        // }
        const button_function = require(`./button_identifiers/${button.id}`)
        const [buttons, embed] = button_function.execute(settings, button)
        button.message.edit({buttons: buttons, embed: embed})
    }
}