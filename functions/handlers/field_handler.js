module.exports = {
    execute(settings, info_file, field_function_file_name, has_pages) {
        /*
        each button has a function in a file in fields
        the function file is named after the id
        it returns optional text, buttons, and an embed
        it edits the message
         */

        function check_field_index(counter){
            //checks if the inner array exists in the fields array or creates it so that I can push values to it
            field_index = Math.floor(counter/settings.config['embed_fields_length'])
            if(!fields[field_index]){
                fields[field_index] = []
            }
        }
        let field_index = 0
        const field_function = require(`./../get_fields/${field_function_file_name}`)
        const fields_unsorted = field_function.execute(info_file, settings.config)
        let fields = []
        if(has_pages) {
            fields_unsorted.forEach(function (each_field, counter) {
                check_field_index(counter)
                fields[field_index] = each_field

            })
        }else{
            fields = fields_unsorted
        }

        return fields

    }
}