module.exports = {
    name: ['kit'],
    description: 'Kit Information',
    use: 'kit [id/args]',
    example:['kit 15', 'kit samurai 3'],
    notes: "Get the passive abilities and stat bonuses of a kit",
    async execute(settings, message, args) {
        //gets the id of the kit described
        let match_id = settings.search_handler.execute('kits', true, args)
        //gets the file of the kit
        const info_file = require('./../../../NexusForce/output/kitData/' + match_id.toString() + '.json')
        //creates an embed with a title link: `objects/item-sets/${match_id}` which is automatically appended to the lu explorer link
        let embed = settings.embed_template.execute(settings.config, info_file.name, `objects/item-sets/${match_id}`, info_file.iconURL)
        //gets all fields
        let fields = settings.field_handler.execute(settings, info_file, 'kits', false)
        //adds the fields to the embed
        fields.forEach(function (each_field){
            embed.addField(each_field.name, each_field.value, each_field.inline)
        })
        //sends the embed
        message.channel.send(embed)

    }
}
