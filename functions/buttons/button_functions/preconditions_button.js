module.exports = {
    execute(settings, button){

        let text

        //gets first embed from the original message
        let embed = button.message.embeds[0]
        embed.fields = []
        let match_id = settings.message_info[button.message.id].match_id
        const info_file = require('./../../../output/objects/' + Math.floor(match_id/256) + '/' + match_id.toString() + '.json')
        //let fields = settings.field_handler(settings, info_file, 'preconditions', false, 'unused')
        let fields = []
        //this command doesnt use fields
        fields.forEach(function (each_field){
            embed.addField(each_field.name, each_field.value, each_field.inline)
        })


        let description = `**Preconditions:**`
        try {
            Object.keys(info_file?.itemComponent?.preconditionDescriptions).forEach(function (element, key) {
                description = `${description}\n**${key + 1}. **${info_file.itemComponent.preconditionDescriptions[element]}`
            })
        }catch{
            description = `${description}\nThis item has no preconditions.`
        }
        embed.setDescription(description)


        let buttons = settings.get_button_group(settings, info_file, 'preconditions_buttons_group')


        return [text, buttons, embed]
    }
}