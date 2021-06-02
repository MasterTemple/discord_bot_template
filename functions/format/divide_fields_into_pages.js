module.exports = {
    execute(settings, unsorted_fields) {
        let fields = []
        function check_field_index(counter){
            //checks if the inner array exists in the fields array or creates it so that I can push values to it
            field_index = Math.floor(counter/settings.config['embed_sizes']['search'])
            if(!fields[field_index]){
                fields[field_index] = []
            }
        }
        let field_index = 0

        unsorted_fields.forEach(function (each_field, counter) {
            check_field_index(counter)
            // fields[field_index].push(each_field)
            fields[field_index].push({
                name:`${counter+1}. ${each_field.name}`,
                value:`${each_field.type}: [[${each_field.id}]](${settings.config.explorer_link_domain}objects/${each_field.id})`,
                inline:true
            })

        })
        return fields

    }
}