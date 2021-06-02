module.exports = {
    name: ['item'],
    description: 'Item Information',
    use: 'item [id/args]',
    example:['item 15', 'item samurai sword 3'],
    notes: "Get the passive abilities and stat bonuses of a item",
    async execute(settings, message, args) {
        //gets the id of the item described
        let match_id = settings.search_handler('bricks_or_items', true, args)
        //gets the file of the item
        const info_file = require('./../../output/objects/' + Math.floor(match_id/256) + '/' + match_id.toString() + '.json')
        //creates an embed with a title link: `objects/item-sets/${match_id}` which is automatically appended to the lu explorer link
        let embed = settings.embed_template(settings.config, `${info_file.itemInfo.displayName} [${match_id}]`, `objects/item-sets/${match_id}`, info_file.iconURL)
        //gets all fields
        let fields = settings.field_handler(settings, info_file, 'items', false, 'unused')
        //gets all buttons
        let buttons = settings.get_button_group(settings, info_file, 'item_buttons_group')
        //adds the fields to the embed
        fields.forEach(function (each_field){
            embed.addField(each_field.name, each_field.value, each_field.inline)
        })
        //sends the embed witht he buttons
        let sent_message = await message.channel.send( {buttons: buttons, embed: embed})
        //creates an object with the message id as the key, storing its button, fields, and the current page
        settings.message_info[sent_message.id] = {buttons: buttons, match_id: match_id}
        //this object deletes after x minutes
        setTimeout(() => delete settings.message_info[sent_message.id], settings.config.time_out_ms)
    }
}
