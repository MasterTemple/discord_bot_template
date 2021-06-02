module.exports = {
    execute(settings, button){

        let text

        //gets first embed from the original message
        let embed = button.message.embeds[0]
        embed.fields = []
        let match_id = settings.message_info[button.message.id].match_id
        const info_file = require('./../../../../NexusForce/output/objects/' + Math.floor(match_id/256) + '/' + match_id.toString() + '.json')
        let fields = settings.field_handler(settings, info_file, 'items', false, 'unused')

        fields.forEach(function (each_field){
            embed.addField(each_field.name, each_field.value, each_field.inline)
        })


        //creates 3 new buttons
        // let drop_button = settings.button_creator(settings.buttons, 'drop_button', 'Drop', {})
        // let earn_button = settings.button_creator(settings.buttons, 'earn_button', 'Earn', {})
        // let buy_button = settings.button_creator(settings.buttons, 'buy_button', 'Buy', {})
        // let more_button_item = settings.button_creator(settings.buttons, 'more_button_item', 'More', {})
        // let buttons = [drop_button, earn_button, buy_button, more_button_item]
        let buttons = settings.get_button_group(settings, info_file, 'item_buttons_group')


        return [text, buttons, embed]
    }
}