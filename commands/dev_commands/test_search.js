module.exports = {
    name: ['testsearch'],
    description: 'Test a feature',
    use: 'testpages',
    example:['testpages'],
    notes: 'This is a command used for testing purposes',
    async execute(settings, message, args) {


        let pages_template = require('./../../functions/get_pages_template.js')
        let title = `Results For: "${args.join(' ')}"`
        let image_url = settings.config.bot_icon_url
        let [buttons, embed] = pages_template.execute(settings, title, image_url)
        let matches = settings.search_handler.execute('objects', false, args)
        //console.log(matches)
        //return
        let fields = []
        function check_field_index(counter){
            //checks if the inner array exists in the fields array or creates it so that I can push values to it
            field_index = Math.floor(counter/settings.config['embed_fields_length'])
            if(!fields[field_index]){
                fields[field_index] = []
            }
        }
        let field_index = 0

        matches.forEach(function (each_field, counter) {
            check_field_index(counter)
            // fields[field_index].push(each_field)
            fields[field_index].push({
                name:`${counter+1}. ${each_field.name}`,
                value:`${each_field.type}: [[${each_field.id}]](${settings.config.explorer_link_domain}objects/${each_field.id})`,
                inline:true
            })

        })

        let page = 0
        //automatically disables 'previously' button
        buttons[0].setDisabled(true)
        //checks if there is only 1 page -> disable 'next' button
        if(fields.length === 1){
            buttons[1].setDisabled(true)
        }

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
