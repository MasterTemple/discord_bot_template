module.exports = {
    execute(info_file, config) {

        const earnFile = info_file
        let fields = []

        if(item?.itemInfo?.name == undefined){
            item.itemInfo.name = "None"
        }
        if(item?.itemInfo?.description == undefined || item?.itemInfo?.description == ``){
            item.itemInfo.description = "None"
        }
        if(item?.itemInfo?.internalNotes == undefined){
            item.itemInfo.internalNotes = "None"
        }
        // console.log(item.itemInfo.name)
        // console.log(item.itemInfo.description)
        // console.log(item.itemInfo.internalNotes)

        for(let skill in Object.keys(item.objectSkills)){

            if(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.name && item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.damageCombo && item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.Description){
                // console.log(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.name)
                // console.log(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.damageCombo)
                // console.log(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.Description)
            }
        }

        let msgEmbed = require(`./../functions/embedTemplate.js`)

        var description = `**Preconditions:**`
        try {
            Object.keys(item?.itemComponent?.preconditionDescriptions).forEach(function (element, key) {
                description = `${description}\n**${key + 1}. **${item.itemComponent.preconditionDescriptions[element]}`
            })
        }catch{
            description = `${description}\nThis item has no preconditions.`
        }

        let embed = msgEmbed.execute(`${item.itemInfo.displayName} [${item.objectID}]`, description, `${luExplorerURL}objects/${itemID}`, img)


        return fields

    }
}
