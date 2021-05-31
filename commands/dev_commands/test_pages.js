module.exports = {
    name: ['testpages'],
    description: 'Test a feature',
    use: 'testpages',
    example:['testpages'],
    notes: 'This is a command used for testing purposes',
    async execute(settings, message, args) {

        
        let pages_template = require('./../../functions/get_pages_template.js')
        let title = "Here is title"
        let image_url = 'https://media.discordapp.net/attachments/642842625895825416/844406594811985940/image0.png'
        let [buttons, embed] = pages_template.execute(settings, title, image_url)
        let fields = [[{name: 'name1', value: 'value1', inline: false}, {name: 'name1', value: 'value1', inline: false}], [{name: 'name2', value: 'value2', inline: false}, {name: 'name2', value: 'value2', inline: false}], [{name: 'name3', value: 'value3', inline: false}, {name: 'name3', value: 'value3', inline: false}]]
        let page = 0
        //automatically disables 'previously' button
        buttons[0].setDisabled(true)
        //checks if there is only 1 page -> disable 'next' button
        if(fields.length === 1){
            buttons[1].setDisabled(true)
        }
        //adds each field for page 0
        fields[page].forEach(function(each_field){
            embed.addField(each_field.name, each_field.value, each_field.inline)
        })
        
        embed.setTitle(`${embed.title} (${page+1})`)
        //sends embed with buttons and returns the id
        let sent_message = await message.channel.send( {buttons: buttons, embed: embed})
        //creates an object with the message id as the key, storing its button, fields, and the current page
        settings.message_info[sent_message.id] = {buttons: buttons, fields: fields, page: page}
        //this object deletes after x minutes
        setTimeout(() => delete settings.message_info[sent_message.id], settings.config.time_out_ms)

    }
}
