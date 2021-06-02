module.exports = {
    execute(settings, info_file){
        let preconditions_button = settings.button_creator(settings.buttons, 'preconditions_button', 'Preconditions', {style: 'green'})
        let package_button = settings.button_creator(settings.buttons, 'package_button', 'Packages', {})
        let back_button_item = settings.button_creator(settings.buttons, 'back_button_item', 'Back', {})

        try {
            if (!Object?.keys(info_file?.itemComponent?.preconditionDescriptions).length > 0) {
                preconditions_button.setDisabled(true)
            }
        }catch{
            preconditions_button.setDisabled(true)
        }

        return [preconditions_button, package_button, back_button_item]
    }
}