module.exports = {
    execute(settings, info_file){
        let drop_button = settings.button_creator(settings.buttons, 'drop_button', 'Drop', {})
        let earn_button = settings.button_creator(settings.buttons, 'earn_button', 'Earn', {style: 'green'})
        let buy_button = settings.button_creator(settings.buttons, 'buy_button', 'Buy', {})
        let back_button_item = settings.button_creator(settings.buttons, 'back_button_item', 'Back', {})

        if(info_file.buyAndDrop.Vendors.length === 0){
            buy_button.setDisabled(true)
        }
        if(Object.keys(info_file.earn).length === 0){
            earn_button.setDisabled(true)
        }
        if(info_file.buyAndDrop.EnemyIDs.length === 0){
            drop_button.setDisabled(true)
        }
        return [drop_button, earn_button, buy_button, back_button_item]
    }
}