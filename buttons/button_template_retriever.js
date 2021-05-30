module.exports = {
    retrieve(buttons, button_id, button_label, params) {
        const button_file = require(`./../templates/buttons/${button_id}`)
        return button_id.execute(buttons, button_label, params)
    }
}