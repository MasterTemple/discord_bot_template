module.exports = {
    execute(settings, button){

        let text

        //gets first embed from the original message
        let embed = button.message.embeds[0]
        let match_id = settings.message_info[button.message.id].match_id
        const info_file = require('./../../../output/objects/' + Math.floor(match_id/256) + '/' + match_id.toString() + '.json')
        //only buttons are changing so the value of
        //info_file doesnt change this command
        let buttons = settings.get_button_group(settings, info_file, 'more_button_item_group')


        return [text, buttons, embed]
    }
}