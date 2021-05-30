module.exports = {
    execute(settings, button){

        let text
        let buttons = settings.message_info[button.message.id].buttons

        buttons.forEach(function(each_button){
            if(each_button.custom_id === 'dev_commands_button'){
                each_button.setStyle('green')
            }else{
                each_button.setStyle('blurple')
            }

        })
        const help_message_embed = require('./../../functions/get_help_message_from_directory')
        let embed = help_message_embed.execute(settings.config, 'dev_commands', "Developer Commands")

        return [text, buttons, embed]
    }
}