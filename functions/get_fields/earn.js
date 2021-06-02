module.exports = {
    execute(info_file, config) {

        let fields = []

        Object.entries(info_file['earn']).forEach((each_entry) => {
            let mission_id = each_entry[0]
            let each_mission = each_entry[1]

            if(each_mission.rewardCount === 1) {
                fields.push({name: `${each_mission['defined_type']} > ${each_mission['defined_subtype']} > ${each_mission['missionName']}`, value: `${each_mission['missionDescription']} [[${mission_id}]](${config['explorer_link_domain']}missions/${mission_id})`, inline: false})
            }else{
                fields.push({name: `${each_mission['defined_type']} > ${each_mission['defined_subtype']} > ${each_mission['missionName']}`, value: `${each_mission['missionDescription']} [Gives **${each_mission['rewardCount']}**] [[${mission_id}]](${config['explorer_link_domain']}missions/${mission_id})`, inline: false})
            }
        })

        if(fields.length === 0){
            fields.push({name: `This Item Is Not Earned!`, value: "Try **!buy** or **!drop** to see how to unlock this item!", inline: false})
        }

        return fields

    }
}
