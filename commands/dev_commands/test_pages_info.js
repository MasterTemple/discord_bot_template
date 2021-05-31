module.exports = {
    name: ['pages'],
    description: 'Test',
    use: `pages`,
    example:[`pages`],
    notes: "Test",
    async execute(settings, message, args) {

        const pages_embed = require('./../../functions/get_pages_embed')


        //sends embed with buttons and returns the id

        const info_file = require('C:\\Users\\dgmastertemple\\Documents\\GitHub\\NexusForce\\output\\kitData\\15.json')
        let title = info_file.name
        let image_url = info_file.iconURL
        let fields_function = require('./../../functions/test_functions/test_kit_function')
        pages_embed.execute(settings, message, args, title, image_url, fields_function.execute, info_file)

        // let sent_message = await message.channel.send({buttons: buttons, embed: pages_embed.execute(settings, title, image_url, message, args)})
        //creates an object with the message id as the key, storing its button, fields, and the current page
        //settings.message_info[sent_message.id] = {buttons: buttons}
        //this object deletes after x minutes
        //setTimeout(() => delete settings.message_info[sent_message.id], settings.config.time_out_ms)
    }
}
