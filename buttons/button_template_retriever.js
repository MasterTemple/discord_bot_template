module.exports = {
    execute(buttons, button_id, button_label, params) {
        const button_file = require(`./../templates/buttons/create_${button_id}`)
        return button_file.execute(buttons, button_label, params)
    }
}