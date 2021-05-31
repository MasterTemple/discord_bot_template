module.exports = {
    execute(settings, button){

        let text
        //gets buttons locally stored from the original message
        let buttons = settings.message_info[button.message.id].buttons

        //gets first embed from the original message
        let embed = button.message.embeds[0]
        //clears the fields and increments the page
        embed.fields = []
        settings.message_info[button.message.id].page--

        //checks if on first and last page -> disable button
        if(settings.message_info[button.message.id].page === 0){
            buttons[0].setDisabled(true)
        }else{
            buttons[0]['disabled'] = false
        }
        if(settings.message_info[button.message.id].page === settings.message_info[button.message.id].fields.length-1){
            buttons[1].setDisabled(true)
        }else{
            buttons[1]['disabled'] = false
        }

        //adds all the fields corresponding to the page
        settings.message_info[button.message.id].fields[settings.message_info[button.message.id].page].forEach(function(each_field){
            embed.addField(each_field.name, each_field.value, each_field.inline)
        })
        //regex edits title page number
        embed.setTitle(embed.title.replace(/\(\d+\)/g, `(${settings.message_info[button.message.id].page+1})`))

        return [text, buttons, embed]
    }
}