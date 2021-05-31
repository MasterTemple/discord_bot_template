module.exports = {
    name: ['testpages'],
    description: 'Test a feature',
    use: 'testpages',
    example:['testpages'],
    notes: 'This is a command used for testing purposes',
    async execute(settings, message, args) {

        // let link_button = settings.button_retriever(settings.buttons, 'link', 'Test Label', {url: 'http://www.google.com'})
        // let test_button = settings.button_retriever(settings.buttons, 'test_button', 'Clicks: 0', {})

        //let pages_template = require('./../../functions/get_pages_template')
        let pages_template = require('./../../functions/get_pages_template.js')
        let title = "Here is title"
        let image_url = 'https://media.discordapp.net/attachments/642842625895825416/844406594811985940/image0.png'
        let [buttons, embed] = pages_template.execute(settings, title, image_url)
        let fields = [[{name: 'name1', value: 'value1', inline: false}, {name: 'name1', value: 'value1', inline: false}], [{name: 'name2', value: 'value2', inline: false}, {name: 'name2', value: 'value2', inline: false}], [{name: 'name3', value: 'value3', inline: false}, {name: 'name3', value: 'value3', inline: false}]]
        let page = 0

        buttons[0].setDisabled(true)

        if(page === fields.length-1){
            buttons[1].setDisabled(true)
        }

        fields[page].forEach(function(each_field){
            embed.addField(each_field.name, each_field.value, each_field.inline)
        })
        embed.setTitle(`${embed.title} (${page+1})`)
        let sent_message = await message.channel.send( {buttons: buttons, embed: embed})
        settings.message_info[sent_message.id] = {buttons: buttons, fields: fields, page: page}
        setTimeout(() => delete settings.message_info[sent_message.id], 300000) //deletes the info after 5 minutes

    }
}
