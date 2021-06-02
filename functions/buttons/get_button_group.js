module.exports = {
    execute(settings, info_file, button_group_name){
        let button_group_file = require(`./button_groups/${button_group_name}`)
        let buttons = button_group_file.execute(settings, info_file)
        return buttons
    }
}