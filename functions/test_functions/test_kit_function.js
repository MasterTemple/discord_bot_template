module.exports = {
    execute(info_file, config){
        let fields = []
        let counter = 0
        let field_index = 0

        function check_field_index(){
            //checks if the inner array exists in the fields array or creates it so that I can push values to it
            field_index = Math.floor(counter/config['embed_fields_length'])
            if(!fields[field_index]){
                fields[field_index] = []
            }
        }

        Object.keys(info_file['skillSetDescriptions']).forEach(function(skillSetBonus) {
            check_field_index()
            fields[field_index].push({
                name: `${skillSetBonus.charAt(skillSetBonus.length-1)} Piece Bonus`,
                value: info_file['skillSetDescriptions'][skillSetBonus],
                inline: false
            })
            counter++
        })
        let with_valiant_length = Object.keys(info_file['totalWithValiant']).length
        let without_valiant_length = Object.keys(info_file['totalWithoutValiant']).length

        if(with_valiant_length > 0 && without_valiant_length > 0){
            check_field_index()
            fields[field_index].push({
                name: config.invis_char,
                value: '**Total Without Valiant**',
                inline: false
            })
            fields[field_index].push(
                {name: `${config.emojis.armor} Armor`, value: info_file['totalWithoutValiant']['armorBonusUI'], inline: true},
                {name: `${config.emojis.heart} Health`, value: info_file['totalWithoutValiant']['lifeBonusUI'], inline: true},
                {name: `${config.emojis.imagination} Imagination`, value: info_file['totalWithoutValiant']['imBonusUI'], inline: true},
            )
            counter++

            check_field_index()
            fields[field_index].push({
                name: config.invis_char,
                value: '**Total With Valiant**',
                inline: false
            })
            fields[field_index].push(
                {name: `${config.emojis.armor} Armor`, value: info_file['totalWithValiant']['armorBonusUI'], inline: true},
                {name: `${config.emojis.heart} Health`, value: info_file['totalWithValiant']['lifeBonusUI'], inline: true},
                {name: `${config.emojis.imagination} Imagination`, value: info_file['totalWithValiant']['imBonusUI'], inline: true},
            )
        }
        else if(without_valiant_length > 0){
            check_field_index()
            fields[field_index].push(
                {name: `${config.emojis.armor} Armor`, value: info_file['totalWithoutValiant']['armorBonusUI'], inline: true},
                {name: `${config.emojis.heart} Health`, value: info_file['totalWithoutValiant']['lifeBonusUI'], inline: true},
                {name: `${config.emojis.imagination} Imagination`, value: info_file['totalWithoutValiant']['imBonusUI'], inline: true},
            )
        }

        return fields
    }
}